'use client';

import { useAtom, useSetAtom } from 'jotai';
import { useCallback } from 'react';

import { getSupabaseBrowserClient } from '@/shared/lib/supabase/client';

import { authLoadingAtom, userAtom } from '../model/atoms';

/** 로그인한 유저 및 로딩 상태 반환 */
export const useAuth = () => {
  const [user] = useAtom(userAtom);
  const [isLoading] = useAtom(authLoadingAtom);
  return { user, isLoading, isLoggedIn: user !== null };
};

/** Google OAuth 로그인 */
export const useSignInWithGoogle = () => {
  const signIn = useCallback(async () => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    const redirectTo =
      typeof window !== 'undefined'
        ? `${window.location.origin}/auth/callback`
        : '/auth/callback';

    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo },
    });
  }, []);

  return signIn;
};

/** 로그아웃 */
export const useSignOut = () => {
  const setUser = useSetAtom(userAtom);

  const signOut = useCallback(async () => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
  }, [setUser]);

  return signOut;
};
