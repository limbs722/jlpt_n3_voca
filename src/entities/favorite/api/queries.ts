'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom, useAtomValue } from 'jotai';

import { userAtom } from '@/entities/auth';
import { getSupabaseBrowserClient } from '@/shared/lib/supabase/client';
import { getAnonymousUserId } from '@/shared/lib/utils/anonymous-user';

import { localFavoritesAtom } from '../model/atoms';

import type { Database } from '@/shared/types/database';

type UserFavoriteInsert = Database['public']['Tables']['user_favorites']['Insert'];

export const FAVORITE_KEYS = {
  all: (userId: string) => ['favorites', userId] as const,
};

interface ToggleFavoriteParams {
  wordId: number;
  next: boolean;
}

interface ToggleFavoriteContext {
  prev: number[];
}

/** 로그인 상태면 auth.uid(), 아니면 익명 UUID 반환 */
const resolveUserId = (authUserId: string | undefined): string => {
  return authUserId ?? getAnonymousUserId();
};

const fetchFavoritesFromSupabase = async (userId: string): Promise<number[] | null> => {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('user_favorites')
    .select('word_id')
    .eq('user_id', userId);
  if (error) {
    console.warn('[favorites] supabase read failed', error);
    return null;
  }
  return (data ?? []).map((r) => r.word_id);
};

export const useFavorites = () => {
  const qc = useQueryClient();
  const [local, setLocal] = useAtom(localFavoritesAtom);
  const user = useAtomValue(userAtom);
  const userId = resolveUserId(user?.id);

  const query = useQuery<number[]>({
    queryKey: FAVORITE_KEYS.all(userId),
    queryFn: async () => {
      const remote = await fetchFavoritesFromSupabase(userId);
      if (remote) {
        // 원격 데이터를 로컬 atom에도 반영 (favoritesCountAtom 정확도 유지)
        setLocal(remote);
        return remote;
      }
      return local;
    },
    initialData: local,
  });

  const mutation = useMutation<ToggleFavoriteParams, Error, ToggleFavoriteParams, ToggleFavoriteContext>({
    mutationFn: async (params) => {
      const supabase = getSupabaseBrowserClient();
      if (supabase) {
        if (params.next) {
          const payload: UserFavoriteInsert = {
            user_id: userId,
            word_id: params.wordId,
          };
          await supabase.from('user_favorites').upsert(payload, { onConflict: 'user_id,word_id' });
        } else {
          await supabase
            .from('user_favorites')
            .delete()
            .eq('user_id', userId)
            .eq('word_id', params.wordId);
        }
      }
      // 로컬 캐시도 동기화 (오프라인 / 비로그인 대비)
      setLocal((prev) => {
        const set = new Set(prev);
        if (params.next) set.add(params.wordId);
        else set.delete(params.wordId);
        return [...set];
      });
      return params;
    },
    onMutate: async ({ wordId, next }) => {
      await qc.cancelQueries({ queryKey: FAVORITE_KEYS.all(userId) });
      const prev = qc.getQueryData<number[]>(FAVORITE_KEYS.all(userId)) ?? [];
      const optimistic = next
        ? Array.from(new Set([...prev, wordId]))
        : prev.filter((id) => id !== wordId);
      qc.setQueryData<number[]>(FAVORITE_KEYS.all(userId), optimistic);
      return { prev };
    },
    onError: (_err, _v, ctx) => {
      if (ctx?.prev) qc.setQueryData<number[]>(FAVORITE_KEYS.all(userId), ctx.prev);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: FAVORITE_KEYS.all(userId) });
    },
  });

  const isFavorite = (wordId: number) => (query.data ?? []).includes(wordId);

  const toggle = (wordId: number) => {
    mutation.mutate({ wordId, next: !isFavorite(wordId) });
  };

  return {
    favoriteIds: query.data ?? [],
    isFavorite,
    toggle,
    isPending: mutation.isPending,
  };
};
