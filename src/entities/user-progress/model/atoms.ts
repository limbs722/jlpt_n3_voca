'use client';

import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { STORAGE_KEYS } from '@/shared/config/constants';

import type { ProgressMap, ProgressStatus } from './types';

export const progressAtom = atomWithStorage<ProgressMap>(STORAGE_KEYS.PROGRESS, {});

export const recordAnswerAtom = atom(null, (get, set, params: { wordId: number; correct: boolean }) => {
  const prev = get(progressAtom);
  const current = prev[params.wordId] ?? {
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
  set(progressAtom, {
    ...prev,
    [params.wordId]: {
      wordId: params.wordId,
      status,
      correctCount,
      incorrectCount,
      lastStudiedAt: new Date().toISOString(),
    },
  });
});

export const statsAtom = atom((get) => {
  const map = get(progressAtom);
  const entries = Object.values(map);
  return {
    total: entries.length,
    known: entries.filter((e) => e.status === 'known').length,
    learning: entries.filter((e) => e.status === 'learning').length,
  };
});
