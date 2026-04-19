'use client';

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

import type { QuizQuestion } from '../../model/types';

interface Props {
  question: QuizQuestion;
  selectedId: number | null;
  /** true = 확인 버튼을 눌러 채점이 완료된 상태 */
  answered: boolean;
  onSelect: (choiceId: number) => void;
}

export const QuizQuestionView = ({ question, selectedId, answered, onSelect }: Props) => {
  const prompt =
    question.direction === 'jp-to-ko' ? (question.word.kanji ?? question.word.reading) : question.word.meaning_ko;

  const subPrompt = question.direction === 'jp-to-ko' && question.word.kanji ? question.word.reading : null;

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
          if (!answered) {
            // 확인 전: 선택한 항목만 파란색 하이라이트
            if (isSelected) state = 'selected';
          } else {
            // 확인 후: 정답/오답 색상 표시
            if (isChoiceCorrect) state = 'correct';
            else if (isSelected) state = 'wrong';
          }

          return (
            <ChoiceButton
              key={c.wordId}
              onClick={() => !answered && onSelect(c.wordId)}
              disabled={answered}
              $state={state}
              $jp={question.direction === 'ko-to-jp'}
              type="button"
            >
              <ChoiceText>{c.text}</ChoiceText>
              {answered && isChoiceCorrect && <ChoiceIcon>✓</ChoiceIcon>}
              {answered && isSelected && !isChoiceCorrect && <ChoiceIcon>✗</ChoiceIcon>}
            </ChoiceButton>
          );
        })}
      </Choices>

      {/* 확인 후에만 피드백 배너 표시 */}
      {answered && (
        <FeedbackBanner $correct={isCorrect}>
          {isCorrect ? '✓  정답이에요!' : `✗  오답 — 정답: ${correctAnswer}`}
        </FeedbackBanner>
      )}
    </Wrap>
  );
};
