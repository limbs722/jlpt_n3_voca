"use client";

import { atom } from "jotai";

import type { QuizPhase, QuizQuestion, QuizResult } from "./types";

export const quizPhaseAtom = atom<QuizPhase>("idle");
export const quizQuestionsAtom = atom<QuizQuestion[]>([]);
export const quizCurrentIndexAtom = atom<number>(0);
export const quizIncorrectIdsAtom = atom<number[]>([]);
export const quizSelectedChoiceAtom = atom<number | null>(null);

export const quizResultAtom = atom<QuizResult | null>((get) => {
  const phase = get(quizPhaseAtom);
  if (phase !== "result") return null;
  const questions = get(quizQuestionsAtom);
  const incorrect = get(quizIncorrectIdsAtom);
  return {
    totalQuestions: questions.length,
    correctCount: questions.length - incorrect.length,
    incorrectWordIds: incorrect,
  };
});
