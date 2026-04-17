"use client";

import styled from "@emotion/styled";

import type { QuizQuestion } from "../model/types";
import { AppTheme } from "@/shared/ui/theme";

interface Props {
  question: QuizQuestion;
  selectedId: number | null;
  disabled: boolean;
  onSelect: (choiceId: number) => void;
}

export const QuizQuestionView = ({
  question,
  selectedId,
  disabled,
  onSelect,
}: Props) => {
  const prompt =
    question.direction === "jp-to-ko"
      ? (question.word.kanji ?? question.word.reading)
      : question.word.meaning_ko;

  const subPrompt =
    question.direction === "jp-to-ko" && question.word.kanji
      ? question.word.reading
      : null;

  return (
    <Wrap>
      <Prompt>
        <PromptLabel>
          {question.direction === "jp-to-ko"
            ? "다음 단어의 뜻은?"
            : "다음 뜻에 해당하는 단어는?"}
        </PromptLabel>
        <PromptValue $jp={question.direction === "jp-to-ko"}>
          {prompt}
        </PromptValue>
        {subPrompt && <SubPrompt>{subPrompt}</SubPrompt>}
      </Prompt>
      <Choices>
        {question.choices.map((c) => {
          const isSelected = selectedId === c.wordId;
          const isCorrect = c.wordId === question.correctId;
          const showResult = disabled;
          const state: ChoiceState = !showResult
            ? isSelected
              ? "selected"
              : "idle"
            : isCorrect
              ? "correct"
              : isSelected
                ? "wrong"
                : "idle";
          return (
            <ChoiceButton
              key={c.wordId}
              onClick={() => !disabled && onSelect(c.wordId)}
              disabled={disabled}
              $state={state}
              $jp={question.direction === "ko-to-jp"}
              type="button"
            >
              {c.text}
            </ChoiceButton>
          );
        })}
      </Choices>
    </Wrap>
  );
};

type ChoiceState = "idle" | "selected" | "correct" | "wrong";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }: { theme: AppTheme }) => theme.spacing(6)};
`;

const Prompt = styled.div`
  background: ${({ theme }: { theme: AppTheme }) => theme.colors.bgElevated};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.colors.border};
  border-radius: ${({ theme }: { theme: AppTheme }) => theme.radii.lg};
  padding: ${({ theme }: { theme: AppTheme }) => theme.spacing(8)}
    ${({ theme }: { theme: AppTheme }) => theme.spacing(5)}px;
  text-align: center;
`;

const PromptLabel = styled.div`
  font-size: 12px;
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.spacing(3)};
  letter-spacing: 0.04em;
`;

const PromptValue = styled.div<{ $jp: boolean }>`
  font-family: ${({ theme, $jp }: { theme: AppTheme; $jp: boolean }) =>
    $jp ? theme.fonts.jp : theme.fonts.base};
  font-size: clamp(28px, 8vw, 40px);
  font-weight: 700;
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.text};
`;

const SubPrompt = styled.div`
  margin-top: ${({ theme }: { theme: AppTheme }) => theme.spacing(2)};
  font-family: ${({ theme }: { theme: AppTheme }) => theme.fonts.jp};
  font-size: 15px;
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.textMuted};
`;

const Choices = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
`;

const ChoiceButton = styled.button<{ $state: ChoiceState; $jp: boolean }>`
  width: 100%;
  padding: 16px 18px;
  border-radius: ${({ theme }: { theme: AppTheme }) => theme.radii.md};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.colors.border};
  background: ${({ theme }: { theme: AppTheme }) => theme.colors.bgElevated};
  font-family: ${({ theme, $jp }: { theme: AppTheme; $jp: boolean }) =>
    $jp ? theme.fonts.jp : theme.fonts.base};
  font-size: 16px;
  text-align: left;
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.text};
  transition: all 0.15s ease;

  &:disabled {
    cursor: default;
  }
  &:hover:not(:disabled) {
    border-color: ${({ theme }: { theme: AppTheme }) => theme.colors.primary};
  }

  ${({ $state, theme }) => {
    switch ($state) {
      case "selected":
        return `
          border-color: ${({ theme }: { theme: AppTheme }) => theme.colors.primary};
          background: ${({ theme }: { theme: AppTheme }) => theme.colors.primary}12;
        `;
      case "correct":
        return `
          border-color: ${({ theme }: { theme: AppTheme }) => theme.colors.success};
          background: ${({ theme }: { theme: AppTheme }) => theme.colors.success}18;
          color: ${({ theme }: { theme: AppTheme }) => theme.colors.success};
          font-weight: 700;
        `;
      case "wrong":
        return `
          border-color: ${({ theme }: { theme: AppTheme }) => theme.colors.danger};
          background: ${({ theme }: { theme: AppTheme }) => theme.colors.danger}15;
          color: ${({ theme }: { theme: AppTheme }) => theme.colors.danger};
          font-weight: 700;
        `;
      default:
        return "";
    }
  }}
`;
