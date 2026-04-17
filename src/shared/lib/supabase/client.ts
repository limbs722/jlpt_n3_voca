'use client';

import { createBrowserClient } from '@supabase/ssr';

import { env, isSupabaseConfigured } from '@/shared/config/env';

import type { Database } from '@/shared/types/database';
import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * We cast to `SupabaseClient<Database>` (only the first generic) because
 * `createBrowserClient` from @supabase/ssr forwards its generics into
 * `SupabaseClient` by position, and the positions changed in
 * @supabase/supabase-js >= 2.5x (a `SchemaNameOrClientOptions` slot was
 * prepended). Passing only `Database` lets `SupabaseClient` recompute
 * `SchemaName` and `Schema` correctly on its own.
 */
export type TypedSupabaseClient = SupabaseClient<Database>;

let cached: TypedSupabaseClient | null = null;

export const getSupabaseBrowserClient = (): TypedSupabaseClient | null => {
  if (!isSupabaseConfigured) return null;
  if (!cached) {
    cached = createBrowserClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY) as unknown as TypedSupabaseClient;
  }
  return cached;
};
