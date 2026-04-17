'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';
import { useCallback, useEffect, useRef } from 'react';

import { userAtom } from '@/entities/auth';
import { getSupabaseBrowserClient } from '@/shared/lib/supabase/client';

import { progressAtom, recordAnswerAtom } from '../model/atoms';
import type { ProgressMap, ProgressStatus, WordProgress } from '../model/types';

import type { Database } from '@/shared/types/database';

type ProgressRow = Database['public']['Tables']['user_progress']['Row'];

export const PROGRESS_KEYS = {
  all: (userId: string) => ['user_progress', userId] as const,
};

// ─────────────────────────────────────────────
// 원격 progress 가져오기
// ─────────────────────────────────────────────
const fetchProgressFromSupabase = async (userId: string): Promise<ProgressMap | null> => {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.warn('[progress] supabase read failed', error);
    return null;
  }

  return (data ?? []).reduce<ProgressMap>((acc, row: ProgressRow) => {
    acc[row.word_id] = {
      wordId: row.word_id,
      status: row.status as ProgressStatus,
      correctCount: row.correct_count,
      incorrectCount: row.incorrect_count,
      lastStudiedAt: row.last_studied_at ?? undefined,
    };
    return acc;
  }, {});
};

// ─────────────────────────────────────────────
// 단일 단어 progress upsert
// ─────────────────────────────────────────────
const upsertProgressToSupabase = async (
  userId: string,
  entry: WordProgress,
): Promise<void> => {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return;

  await supabase.from('user_progress').upsert(
    {
      user_id: userId,
      word_id: entry.wordId,
      status: entry.status,
      correct_count: entry.correctCount,
      incorrect_count: entry.incorrectCount,
      last_studied_at: entry.lastStudiedAt ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,word_id' },
  );
};

// ─────────────────────────────────────────────
// 로그인 시 로컬 데이터를 Supabase로 마이그레이션
// ─────────────────────────────────────────────
export const migrateLocalProgressToSupabase = async (
  userId: string,
  localProgress: ProgressMap,
): Promise<void> => {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return;

  const entries = Object.values(localProgress);
  if (entries.length === 0) return;

  const rows = entries.map((e) => ({
    user_id: userId,
    word_id: e.wordId,
    status: e.status,
    correct_count: e.correctCount,
    incorrect_count: e.incorrectCount,
    last_studied_at: e.lastStudiedAt ?? null,
    updated_at: new Date().toISOString(),
  }));

  await supabase
    .from('user_progress')
    .upsert(rows, { onConflict: 'user_id,word_id' });
};

// ─────────────────────────────────────────────
// 로그인 시 서버 데이터를 로컬에 병합하는 훅
// ─────────────────────────────────────────────
/**
 * 로그인된 유저의 progress를 Supabase에서 가져와 로컬 atom과 병합합니다.
 * (정답 횟수가 더 높은 쪽을 우선 채택)
 */
export const useProgressSync = () => {
  const [user] = useAtom(userAtom);
  const [localProgress, setLocalProgress] = useAtom(progressAtom);
  const hasSynced = useRef(false);

  useEffect(() => {
    if (!user || hasSynced.current) return;

    const sync = async () => {
      hasSynced.current = true;

      // 1. 로컬 데이터 → Supabase 마이그레이션
      await migrateLocalProgressToSupabase(user.id, localProgress);

      // 2. 서버 데이터 fetch
      const remote = await fetchProgressFromSupabase(user.id);
      if (!remote) return;

      // 3. 로컬 + 원격 병합 (correctCount 높은 쪽 우선)
      const merged: ProgressMap = { ...localProgress };
      for (const [key, remoteEntry] of Object.entries(remote)) {
        const local = merged[key];
        if (!local || remoteEntry.correctCount > local.correctCount) {
          merged[key] = remoteEntry;
        }
      }

      setLocalProgress(merged);
    };

    sync();
  }, [user, localProgress, setLocalProgress]);

  // 로그아웃 시 sync 플래그 리셋
  useEffect(() => {
    if (!user) {
      hasSynced.current = false;
    }
  }, [user]);
};

// ─────────────────────────────────────────────
// 퀴즈/플래시카드 답변 기록 훅
// ─────────────────────────────────────────────
/**
 * `recordAnswerAtom`을 래핑하여 로그인 중이면 Supabase에도 동기화합니다.
 */
export const useRecordAnswer = () => {
  const [user] = useAtom(userAtom);
  const [progress] = useAtom(progressAtom);
  const recordAnswer = useSetAtom(recordAnswerAtom);

  return useCallback(
    async (params: { wordId: number; correct: boolean }) => {
      // 1. 로컬 atom 업데이트 (기존 로직)
      recordAnswer(params);

      // 2. 로그인 상태면 Supabase에도 저장
      if (!user) return;

      // atom 업데이트 직후의 값을 계산 (recordAnswerAtom 내부 로직 반영)
      const current = progress[params.wordId] ?? {
        wordId: params.wordId,
        status: 'new' as ProgressStatus,
        correctCount: 0,
        incorrectCount: 0,
      };
      const correctCount = current.correctCount + (params.correct ? 1 : 0);
      const incorrectCount = current.incorrectCount + (params.correct ? 0 : 1);
      let status: ProgressStatus = 'learning';
      if (correctCount >= 3 && correctCount > incorrectCount) status = 'known';
      if (correctCount === 0 && incorrectCount === 0) status = 'new';

      await upsertProgressToSupabase(user.id, {
        wordId: params.wordId,
        status,
        correctCount,
        incorrectCount,
        lastStudiedAt: new Date().toISOString(),
      });
    },
    [user, progress, recordAnswer],
  );
};
