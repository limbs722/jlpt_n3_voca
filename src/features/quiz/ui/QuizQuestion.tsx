'use client';

import styled from '@emotion/styled';

import type { AppTheme } from '@/shared/ui/theme';

import type { QuizQuestion } from '../model/types';

interface Props {
  question: QuizQuestion;
  selectedId: number | null;
  disabled: boolean;
  onSelect: (choiceId: number) => void;
}

export const QuizQuestionView = ({ question, selectedId, disabled, onSelect }: Props) => {
  const prompt =
    question.direction === 'jp-to-ko' ? (question.word.kanji ?? question.word.reading) : question.word.meaning_ko;

  const subPrompt = question.direction === 'jp-to-ko' && question.word.kanji ? question.word.reading : null;

  const isAnswered = selectedId !== null;
  const isCorrect = selectedId === question.correctId;
  const correctAnswer = question.choices.find((c) => c.wordId === question.correctId)?.text ?? '';

  return (
    <Wrap>
      <Prompt>
        <PromptLabel>
          {question.direction === 'jp-to-ko' ? '다음 단어의 뜻은?' : '다음 뜻에 해당하는 단어는?'}
        </PromptLabel>
        <PromptValue $jp={question.direction === 'jp-to-ko'}>{prompt}</PromptValue>
        {subPrompt && <SubPrompt>{subPrompt}</SubPrompt>}
      </Prompt>

      <Choices>
        {question.choices.map((c) => {
          const isSelected = selectedId === c.wordId;
          const isChoiceCorrect = c.wordId === question.correctId;

          let state: ChoiceState = 'idle';
          if (isAnswered) {
            if (isChoiceCorrect) state = 'correct';
            else if (isSelected) state = 'wrong';
          }

          return (
            <ChoiceButton
              key={c.wordId}
              onClick={() => !disabled && onSelect(c.wordId)}
              disabled={disabled}
              $state={state}
              $jp={question.direction === 'ko-to-jp'}
              type="button"
            >
              <ChoiceText>{c.text}</ChoiceText>
              {isAnswered && isChoiceCorrect && <ChoiceIcon>✓</ChoiceIcon>}
              {isAnswered && isSelected && !isChoiceCorrect && <ChoiceIcon>✗</ChoiceIcon>}
            </ChoiceButton>
          );
        })}
      </Choices>

      {/* 정답/오답 피드백 배너 */}
      {isAnswered && (
        <FeedbackBanner $correct={isCorrect}>
          {isCorrect ? '✓  정답이에요!' : `✗  오답 — 정답: ${correctAnswer}`}
        </FeedbackBanner>
      )}
    </Wrap>
  );
};

type ChoiceState = 'idle' | 'selected' | 'correct' | 'wrong';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const Prompt = styled.div`
  background: ${({ theme }) => theme.colors.bgElevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing(8)} ${({ theme }) => theme.spacing(5)};
  text-align: center;
`;

const PromptLabel = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  letter-spacing: 0.04em;
`;

const PromptValue = styled('div', {
  shouldForwardProp: (prop) => prop !== '$jp',
})<{ $jp: boolean }>`
  font-family: ${({ theme, $jp }: { theme: AppTheme; $jp: boolean }) =>
    $jp ? theme.fonts.jp : theme.fonts.base};
  font-size: clamp(28px, 8vw, 40px);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const SubPrompt = styled.div`
  margin-top: ${({ theme }) => theme.spacing(2)};
  font-family: ${({ theme }) => theme.fonts.jp};
  font-size: 15px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Choices = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
`;

/* state별 색상 함수 — theme이 직접 주입된 상태에서 호출 */
const stateStyles = (state: ChoiceState, theme: AppTheme) => {
  switch (state) {
    case 'correct':
      return `
        border-color: ${theme.colors.success};
        background: ${theme.colors.success}22;
        color: ${theme.colors.success};
        font-weight: 700;
      `;
    case 'wrong':
      return `
        border-color: ${theme.colors.danger};
        background: ${theme.colors.danger}18;
        color: ${theme.colors.danger};
        font-weight: 700;
      `;
    default:
      return '';
  }
};

const ChoiceButton = styled('button', {
  shouldForwardProp: (prop) => prop !== '$state' && prop !== '$jp',
})<{ $state: ChoiceState; $jp: boolean }>`
  width: 100%;
  padding: 14px 16px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bgElevated};
  font-family: ${({ theme, $jp }: { theme: AppTheme; $jp: boolean }) =>
    $jp ? theme.fonts.jp : theme.fonts.base};
  font-size: 15px;
  text-align: left;
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  &:disabled {
    cursor: default;
  }
  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surface};
  }

  ${({ $state, theme }: { $state: ChoiceState; theme: AppTheme }) => stateStyles($state, theme)}
`;

const ChoiceText = styled.span`
  flex: 1;
`;

const ChoiceIcon = styled.span`
  font-size: 16px;
  font-weight: 700;
  flex-shrink: 0;
`;

const FeedbackBanner = styled('div', {
  shouldForwardProp: (prop) => prop !== '$correct',
})<{ $correct: boolean }>`
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  background: ${({ theme, $correct }: { theme: AppTheme; $correct: boolean }) =>
    $correct ? `${theme.colors.success}18` : `${theme.colors.danger}15`};
  color: ${({ theme, $correct }: { theme: AppTheme; $correct: boolean }) =>
    $correct ? theme.colors.success : theme.colors.danger};
  border: 1px solid
    ${({ theme, $correct }: { theme: AppTheme; $correct: boolean }) =>
      $correct ? `${theme.colors.success}50` : `${theme.colors.danger}50`};
`;
