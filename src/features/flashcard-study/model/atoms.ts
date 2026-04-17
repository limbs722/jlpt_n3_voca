"use client";

import { atom } from "jotai";

export const flashcardIndexAtom = atom(0);
export const flashcardFlippedAtom = atom(false);
export const flashcardDeckSizeAtom = atom<number>(20);
