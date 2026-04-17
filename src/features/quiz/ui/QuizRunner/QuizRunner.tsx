'use client';

import { useEffect } from 'react';

import { useAtom } from 'jotai';

import { useRecordAnswer } from '@/entities/user-progress';
import { useWordsQuery } from '@/entities/word';
import { Button } from '@/shared/ui/Button';
import { Stack } from '@/shared/ui/Container';

import { buildQuizQuestions } from '../../lib/build-questions';
import {
  quizCurrentIndexAtom,
  quizIncorrectIdsAtom,
  quizPhaseAtom,
  quizQuestionsAtom,
  quizSelectedChoiceAtom,
} from '../../model/atoms';
import { QuizQuestionView } from '../QuizQuestion/QuizQuestion';
import { QuizResultView } from '../QuizResult/QuizResult';

import { BarFill, BarLabel, BarWrap, Info, StartCard, StartDesc, StartTitle } from './QuizRunner.style';

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

  const ProgressBar = () => (
    <BarWrap>
      <BarFill style={{ width: `${((index + 1) / questions.length) * 100}%` }} />
      <BarLabel>
        {index + 1} / {questions.length}
      </BarLabel>
    </BarWrap>
  );

  return (
    <Stack gap={4}>
      <ProgressBar />
      <QuizQuestionView question={current} selectedId={selected} disabled={selected !== null} onSelect={handleSelect} />
      <Button size="lg" onClick={handleNext} disabled={selected === null} fullWidth>
        {index + 1 >= questions.length ? '결과 보기' : '다음 문제'}
      </Button>
    </Stack>
  );
};
