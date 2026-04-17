import { cookies } from 'next/headers';

import { createServerClient, type CookieOptions } from '@supabase/ssr';

import { env, isSupabaseConfigured } from '@/shared/config/env';

import type { Database } from '@/shared/types/database';
import type { SupabaseClient } from '@supabase/supabase-js';

export type TypedSupabaseServerClient = SupabaseClient<Database>;

export const getSupabaseServerClient = (): TypedSupabaseServerClient | null => {
  if (!isSupabaseConfigured) return null;
  const cookieStore = cookies();
  return createServerClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch {
          // called from a Server Component — ignore
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: '', ...options });
        } catch {
          // called from a Server Component — ignore
        }
      },
    },
  }) as unknown as TypedSupabaseServerClient;
};
