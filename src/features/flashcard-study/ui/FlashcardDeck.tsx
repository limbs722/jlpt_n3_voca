'use client';

import { useEffect, useMemo } from 'react';

import styled from '@emotion/styled';
import { useAtom } from 'jotai';

import { useRecordAnswer } from '@/entities/user-progress';
import { useWordsQuery, type Word } from '@/entities/word';
import { shuffle } from '@/shared/lib/utils/shuffle';
import { Button } from '@/shared/ui/Button';
import { Stack } from '@/shared/ui/Container';

import { flashcardDeckSizeAtom, flashcardFlippedAtom, flashcardIndexAtom } from '../model/atoms';

import { Flashcard } from './Flashcard';

interface Props {
  /** 즐겨찾기 id 배열을 넘기면 해당 단어만으로 덱 구성 */
  filterIds?: number[];
  /** 필수 단어만 */
  essentialOnly?: boolean;
}

export const FlashcardDeck = ({ filterIds, essentialOnly }: Props) => {
  const { data: words = [], isLoading } = useWordsQuery();
  const [index, setIndex] = useAtom(flashcardIndexAtom);
  const [flipped, setFlipped] = useAtom(flashcardFlippedAtom);
  const [size] = useAtom(flashcardDeckSizeAtom);
  const recordAnswer = useRecordAnswer();

  const deck = useMemo<Word[]>(() => {
    let list = words;
    if (filterIds && filterIds.length) {
      const set = new Set(filterIds);
      list = list.filter((w) => set.has(w.id));
    }
    if (essentialOnly) list = list.filter((w) => w.is_essential);
    return shuffle(list).slice(0, Math.max(size, 5));
  }, [words, filterIds, essentialOnly, size]);

  useEffect(() => {
    setIndex(0);
    setFlipped(false);
  }, [deck.length, setIndex, setFlipped]);

  if (isLoading) return <Info>단어를 불러오는 중…</Info>;
  if (deck.length === 0) return <Info>학습할 단어가 없습니다.</Info>;

  const current = deck[Math.min(index, deck.length - 1)];
  const atLast = index >= deck.length - 1;

  const handleKnown = () => {
    recordAnswer({ wordId: current.id, correct: true });
    goNext();
  };

  const handleUnknown = () => {
    recordAnswer({ wordId: current.id, correct: false });
    goNext();
  };

  const goNext = () => {
    setFlipped(false);
    setIndex((i) => Math.min(i + 1, deck.length));
  };

  if (atLast && index === deck.length) {
    return (
      <DoneWrap>
        <DoneTitle>오늘의 덱을 모두 풀었어요 🎉</DoneTitle>
        <DoneDesc>총 {deck.length}개 단어를 학습했습니다. 다시 섞어 한번 더 해볼까요?</DoneDesc>
        <Button
          onClick={() => {
            setIndex(0);
            setFlipped(false);
          }}
          size="lg"
        >
          다시 시작
        </Button>
      </DoneWrap>
    );
  }

  return (
    <Stack gap={4}>
      <Progress>
        {index + 1} / {deck.length}
      </Progress>
      <Flashcard word={current} flipped={flipped} onFlip={() => setFlipped((f) => !f)} />
      <Controls>
        <Button variant="secondary" onClick={handleUnknown} size="lg" fullWidth>
          모르겠어요
        </Button>
        <Button onClick={handleKnown} size="lg" fullWidth>
          외웠어요
        </Button>
      </Controls>
    </Stack>
  );
};

const Info = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: ${({ theme }) => theme.spacing(8)} 0;
`;

const Progress = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
`;

const Controls = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

const DoneWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: ${({ theme }) => theme.spacing(10)} ${({ theme }) => theme.spacing(4)};
  text-align: center;
`;

const DoneTitle = styled.h2`
  font-size: 20px;
  margin: 0;
`;

const DoneDesc = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 14px;
  max-width: 320px;
`;
