'use client';

import { atom } from 'jotai';
import type { User } from '@supabase/supabase-js';

/** 현재 로그인된 Supabase 유저. null = 비로그인 */
export const userAtom = atom<User | null>(null);

/** auth 세션 초기 로딩 중 여부 */
export const authLoadingAtom = atom<boolean>(true);

/** 로그인 여부 파생 atom */
export const isLoggedInAtom = atom((get) => get(userAtom) !== null);
