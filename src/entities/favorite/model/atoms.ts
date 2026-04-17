"use client";

import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { STORAGE_KEYS } from "@/shared/config/constants";

/**
 * 로컬 즐겨찾기 폴백.
 * Supabase 가 연결돼 있으면 useFavorites 훅이 원격 상태를 우선 사용하고
 * 로컬 저장소는 오프라인/미로그인 대체 용도로만 쓰입니다.
 */
export const localFavoritesAtom = atomWithStorage<number[]>(
  STORAGE_KEYS.FAVORITES,
  [],
);

/** 즐겨찾기한 단어 수 파생 atom */
export const favoritesCountAtom = atom((get) => get(localFavoritesAtom).length);
