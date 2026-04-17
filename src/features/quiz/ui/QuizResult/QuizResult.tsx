'use client';

import { useAtomValue } from 'jotai';

import { WordCard, useWordsQuery } from '@/entities/word';
import { Button } from '@/shared/ui/Button';
import { Stack } from '@/shared/ui/Container';

import { quizResultAtom } from '../../model/atoms';

import {
  Message,
  Percent,
  ReviewList,
  Score,
  ScoreNum,
  ScoreSlash,
  ScoreTotal,
  Section,
  SectionTitle,
  Summary,
  SummaryTitle,
} from './QuizResult.style';

interface Props {
  onRestart: () => void;
}

export const QuizResultView = ({ onRestart }: Props) => {
  const result = useAtomValue(quizResultAtom);
  const { data: words = [] } = useWordsQuery();

  if (!result) return null;

  const percent = Math.round((result.correctCount / result.totalQuestions) * 100);

  const incorrectWords = words.filter((w) => result.incorrectWordIds.includes(w.id));

  return (
    <Stack gap={5}>
      <Summary>
        <SummaryTitle>퀴즈 결과</SummaryTitle>
        <Score>
          <ScoreNum>{result.correctCount}</ScoreNum>
          <ScoreSlash>/</ScoreSlash>
          <ScoreTotal>{result.totalQuestions}</ScoreTotal>
        </Score>
        <Percent>{percent}점</Percent>
        <Message>
          {percent === 100
            ? '완벽해요! 이 구간은 통과예요 🎯'
            : percent >= 80
              ? '아주 잘했어요! 조금만 더 가다듬어 볼까요?'
              : percent >= 60
                ? '꾸준히만 하면 금방 늘 거예요 💪'
                : '틀린 단어를 다시 한 번 천천히 확인해 보세요.'}
        </Message>
      </Summary>

      {incorrectWords.length > 0 && (
        <Section>
          <SectionTitle>틀린 단어 다시 보기</SectionTitle>
          <ReviewList>
            {incorrectWords.map((w) => (
              <WordCard key={w.id} word={w} compact />
            ))}
          </ReviewList>
        </Section>
      )}

      <Button onClick={onRestart} size="lg" fullWidth>
        다시 풀기
      </Button>
    </Stack>
  );
};
