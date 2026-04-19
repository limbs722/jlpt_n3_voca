import { pickRandom, shuffle } from '@/shared/lib/utils/shuffle';

import type { QuizQuestion } from '../model/types';
import type { Word } from '@/entities/word/model';

export const buildQuizQuestions = (words: Word[], count = 10): QuizQuestion[] => {
  if (words.length < 4) return [];
  const pool = shuffle(words);
  const selected = pool.slice(0, Math.min(count, pool.length));

  return selected.map((word) => {
    const direction: QuizQuestion['direction'] = Math.random() > 0.5 ? 'jp-to-ko' : 'ko-to-jp';

    const distractors = pickRandom(
      words.filter((w) => w.id !== word.id),
      3,
    );
    const choices = shuffle(
      [word, ...distractors].map((w) => ({
        wordId: w.id,
        text: direction === 'jp-to-ko' ? w.meaning_ko : (w.kanji ?? w.reading),
      })),
    );

    return {
      word,
      direction,
      choices,
      correctId: word.id,
    };
  });
};
