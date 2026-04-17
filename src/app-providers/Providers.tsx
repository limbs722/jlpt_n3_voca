'use client';

import { useState, useEffect, useRef, type ReactNode } from 'react';

import { ThemeProvider } from '@emotion/react';
import { QueryClientProvider, HydrationBoundary, type DehydratedState } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider as JotaiProvider, useSetAtom, useAtomValue } from 'jotai';

import { authLoadingAtom, userAtom } from '@/entities/auth';
import { localFavoritesAtom } from '@/entities/favorite';
import { progressAtom, migrateLocalProgressToSupabase, useProgressSync } from '@/entities/user-progress';
import { EmotionRegistry } from '@/shared/lib/emotion/registry';
import { createQueryClient } from '@/shared/lib/query/query-client';
import { getSupabaseBrowserClient } from '@/shared/lib/supabase/client';
import { GlobalStyles, theme } from '@/shared/ui';

import type { User } from '@supabase/supabase-js';

interface ProvidersProps {
  children: ReactNode;
  dehydratedState?: DehydratedState;
}

/**
 * Supabase auth 상태를 구독하여 userAtom / authLoadingAtom을 관리합니다.
 * 최초 로그인 시 로컬 localStorage 데이터를 Supabase로 마이그레이션합니다.
 */
const AuthInitializer = () => {
  const setUser = useSetAtom(userAtom);
  const setAuthLoading = useSetAtom(authLoadingAtom);
  const localFavorites = useAtomValue(localFavoritesAtom);
  const localProgress = useAtomValue(progressAtom);
  const prevUserRef = useRef<User | null>(null);

  // 로그인 후 서버 progress를 로컬 atom에 병합
  useProgressSync();

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setAuthLoading(false);
      return;
    }

    // 현재 세션 초기 로드
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      prevUserRef.current = session?.user ?? null;
      setAuthLoading(false);
    });

    // 로그인/로그아웃 이벤트 구독
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      const newUser = session?.user ?? null;
      const prevUser = prevUserRef.current;

      setUser(newUser);
      setAuthLoading(false);

      // 새로 로그인한 경우에만 마이그레이션 실행
      const isNewLogin = !prevUser && newUser;
      if (isNewLogin && newUser) {
        // 로컬 progress → Supabase 마이그레이션
        await migrateLocalProgressToSupabase(newUser.id, localProgress);

        // 로컬 즐겨찾기 → Supabase 마이그레이션
        if (localFavorites.length > 0) {
          const rows = localFavorites.map((wordId) => ({
            user_id: newUser.id,
            word_id: wordId,
          }));
          await supabase.from('user_favorites').upsert(rows, { onConflict: 'user_id,word_id' });
        }
      }

      prevUserRef.current = newUser;
    });

    return () => subscription.unsubscribe();
  }, []);

  return null;
};

export const Providers = ({ children, dehydratedState }: ProvidersProps) => {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <EmotionRegistry>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={dehydratedState}>
            <JotaiProvider>
              <AuthInitializer />
              {children}
            </JotaiProvider>
          </HydrationBoundary>
          {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
      </ThemeProvider>
    </EmotionRegistry>
  );
};
