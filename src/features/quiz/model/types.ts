import type { Word } from '@/entities/word/model';

export interface QuizChoice {
  wordId: number;
  text: string;
}

export interface QuizQuestion {
  word: Word;
  /** 물어보는 방향: "jp-to-ko" = 일본어 → 한국어 뜻, "ko-to-jp" = 한국어 뜻 → 일본어 */
  direction: 'jp-to-ko' | 'ko-to-jp';
  choices: QuizChoice[];
  correctId: number;
}

export interface QuizResult {
  totalQuestions: number;
  correctCount: number;
  incorrectWordIds: number[];
}

export type QuizPhase = 'idle' | 'running' | 'result';
