'use client';

import { useEffect } from 'react';

import styled from '@emotion/styled';
import { useAtom } from 'jotai';

import { useRecordAnswer } from '@/entities/user-progress';
import { useWordsQuery } from '@/entities/word';
import { Button } from '@/shared/ui/Button';
import { Stack } from '@/shared/ui/Container';
import { AppTheme } from '@/shared/ui/theme';

import { buildQuizQuestions } from '../lib/build-questions';
import {
  quizCurrentIndexAtom,
  quizIncorrectIdsAtom,
  quizPhaseAtom,
  quizQuestionsAtom,
  quizSelectedChoiceAtom,
} from '../model/atoms';

import { QuizQuestionView } from './QuizQuestion';
import { QuizResultView } from './QuizResult';

interface Props {
  questionCount?: number;
  essentialOnly?: boolean;
  filterIds?: number[];
}

export const QuizRunner = ({ questionCount = 10, essentialOnly, filterIds }: Props) => {
  const { data: words = [], isLoading } = useWordsQuery();
  const [phase, setPhase] = useAtom(quizPhaseAtom);
  const [questions, setQuestions] = useAtom(quizQuestionsAtom);
  const [index, setIndex] = useAtom(quizCurrentIndexAtom);
  const [incorrect, setIncorrect] = useAtom(quizIncorrectIdsAtom);
  const [selected, setSelected] = useAtom(quizSelectedChoiceAtom);
  const recordAnswer = useRecordAnswer();

  useEffect(() => {
    // reset when component mounts (new quiz session)
    setPhase('idle');
    setQuestions([]);
    setIndex(0);
    setIncorrect([]);
    setSelected(null);
  }, [setPhase, setQuestions, setIndex, setIncorrect, setSelected]);

  const startQuiz = () => {
    let pool = words;
    if (filterIds?.length) {
      const set = new Set(filterIds);
      pool = pool.filter((w) => set.has(w.id));
    }
    if (essentialOnly) pool = pool.filter((w) => w.is_essential);
    const qs = buildQuizQuestions(pool, questionCount);
    if (qs.length === 0) return;
    setQuestions(qs);
    setIndex(0);
    setIncorrect([]);
    setSelected(null);
    setPhase('running');
  };

  const handleSelect = (choiceId: number) => {
    if (selected !== null) return;
    setSelected(choiceId);
    const q = questions[index];
    const correct = choiceId === q.correctId;
    recordAnswer({ wordId: q.word.id, correct });
    if (!correct) setIncorrect((prev) => [...prev, q.word.id]);
  };

  const handleNext = () => {
    setSelected(null);
    if (index + 1 >= questions.length) {
      setPhase('result');
      return;
    }
    setIndex((i) => i + 1);
  };

  if (isLoading) return <Info>단어를 불러오는 중…</Info>;

  if (phase === 'idle') {
    return (
      <StartCard>
        <StartTitle>퀴즈 모드</StartTitle>
        <StartDesc>
          {questionCount}문제의 4지선다 퀴즈를 풀어 볼까요? 일본어 → 한국어, 한국어 → 일본어가 섞여 출제됩니다.
        </StartDesc>
        <Button size="lg" onClick={startQuiz} fullWidth>
          시작하기
        </Button>
      </StartCard>
    );
  }

  if (phase === 'result') {
    return (
      <QuizResultView
        onRestart={() => {
          setPhase('idle');
        }}
      />
    );
  }

  const current = questions[index];
  if (!current) return null;

  return (
    <Stack gap={4}>
      <ProgressBar total={questions.length} index={index} />
      <QuizQuestionView question={current} selectedId={selected} disabled={selected !== null} onSelect={handleSelect} />
      <Button size="lg" onClick={handleNext} disabled={selected === null} fullWidth>
        {index + 1 >= questions.length ? '결과 보기' : '다음 문제'}
      </Button>
    </Stack>
  );
};

const ProgressBar = ({ total, index }: { total: number; index: number }) => (
  <BarWrap>
    <BarFill style={{ width: `${((index + 1) / total) * 100}%` }} />
    <BarLabel>
      {index + 1} / {total}
    </BarLabel>
  </BarWrap>
);

const Info = styled.p`
  text-align: center;
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.textMuted};
  padding: ${({ theme }: { theme: AppTheme }) => theme.spacing(8)}px 0;
`;

const StartCard = styled.div`
  background: ${({ theme }: { theme: AppTheme }) => theme.colors.bgElevated};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.colors.border};
  border-radius: ${({ theme }: { theme: AppTheme }) => theme.radii.lg};
  padding: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
`;

const StartTitle = styled.h2`
  font-size: 22px;
  margin: 0;
`;

const StartDesc = styled.p`
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.textMuted};
  font-size: 14px;
  margin: 0 0 8px;
  line-height: 1.6;
  max-width: 320px;
`;

const BarWrap = styled.div`
  position: relative;
  height: 6px;
  border-radius: 3px;
  background: ${({ theme }: { theme: AppTheme }) => theme.colors.surface};
  overflow: hidden;
`;

const BarFill = styled.div`
  position: absolute;
  inset: 0 auto 0 0;
  background: ${({ theme }: { theme: AppTheme }) => theme.colors.primary};
  transition: width 0.3s ease;
`;

const BarLabel = styled.span`
  display: none;
`;
