export const APP_NAME = 'JLPT N3 단어장';
export const APP_DESCRIPTION = 'JLPT N3 기출 빈출 & 필수 단어장 — 플래시카드, 퀴즈, 복습 리스트';

export const STORAGE_KEYS = {
  FAVORITES: 'jlpt-n3/favorites/v1',
  PROGRESS: 'jlpt-n3/progress/v1',
  REVIEW_QUEUE: 'jlpt-n3/review-queue/v1',
  USER_SETTINGS: 'jlpt-n3/settings/v1',
} as const;

export const ROUTES = {
  HOME: '/',
  STUDY: '/study',
  QUIZ: '/quiz',
  FAVORITES: '/favorites',
  WORDS: '/words',
  WORD_DETAIL: (id: string | number) => `/words/${id}`,
} as const;
