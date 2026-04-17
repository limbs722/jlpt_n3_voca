'use client';

import type { QuizQuestion } from '../../model/types';

import {
  ChoiceButton,
  ChoiceIcon,
  ChoiceState,
  ChoiceText,
  Choices,
  FeedbackBanner,
  Prompt,
  PromptLabel,
  PromptValue,
  SubPrompt,
  Wrap,
} from './QuizQuestion.style';

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
