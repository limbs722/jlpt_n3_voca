"use client";

import styled from "@emotion/styled";
import { useAtomValue } from "jotai";

import { WordCard, useWordsQuery } from "@/entities/word";
import { Button } from "@/shared/ui/Button";
import { Stack } from "@/shared/ui/Container";

import { quizResultAtom } from "../model/atoms";
import { AppTheme } from "@/shared/ui/theme";

interface Props {
  onRestart: () => void;
}

export const QuizResultView = ({ onRestart }: Props) => {
  const result = useAtomValue(quizResultAtom);
  const { data: words = [] } = useWordsQuery();

  if (!result) return null;

  const percent = Math.round(
    (result.correctCount / result.totalQuestions) * 100,
  );

  const incorrectWords = words.filter((w) =>
    result.incorrectWordIds.includes(w.id),
  );

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
            ? "완벽해요! 이 구간은 통과예요 🎯"
            : percent >= 80
              ? "아주 잘했어요! 조금만 더 가다듬어 볼까요?"
              : percent >= 60
                ? "꾸준히만 하면 금방 늘 거예요 💪"
                : "틀린 단어를 다시 한 번 천천히 확인해 보세요."}
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

const Summary = styled.div`
  background: ${({ theme }: { theme: AppTheme }) => theme.colors.bgElevated};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.colors.border};
  border-radius: ${({ theme }: { theme: AppTheme }) => theme.radii.lg};
  padding: ${({ theme }: { theme: AppTheme }) => theme.spacing(8)}px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`;

const SummaryTitle = styled.h2`
  margin: 0;
  font-size: 18px;
`;

const Score = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-top: 4px;
`;

const ScoreNum = styled.span`
  font-size: 48px;
  font-weight: 800;
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.primary};
`;

const ScoreSlash = styled.span`
  font-size: 24px;
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.textMuted};
`;

const ScoreTotal = styled.span`
  font-size: 24px;
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.textMuted};
`;

const Percent = styled.div`
  font-size: 16px;
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.text};
  font-weight: 600;
`;

const Message = styled.p`
  margin: 0;
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.textMuted};
  font-size: 14px;
`;

const Section = styled.section``;

const SectionTitle = styled.h3`
  margin: 0 0 ${({ theme }: { theme: AppTheme }) => theme.spacing(2)}px;
  font-size: 15px;
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.text};
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
