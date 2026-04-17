export type ProgressStatus = "new" | "learning" | "known";

export interface WordProgress {
  wordId: number;
  status: ProgressStatus;
  correctCount: number;
  incorrectCount: number;
  lastStudiedAt?: string;
}

export interface ProgressMap {
  [wordId: string]: WordProgress;
}
