'use client';

import type { ReactNode } from 'react';

import { Badge } from '@/shared/ui/Badge';

import { POS_LABEL_KO, type Word } from '../../model/types';

import { BadgeRow, Kanji, Main, Meaning, Reading, RightSlot, Row, Shell } from './WordCard.style';

interface Props {
  word: Word;
  onClick?: () => void;
  right?: ReactNode;
  compact?: boolean;
}

export const WordCard = ({ word, onClick, right, compact = false }: Props) => (
  <Shell onClick={onClick} $clickable={Boolean(onClick)} $compact={compact}>
    <Main>
      <Row>
        <Kanji>{word.kanji ?? word.reading}</Kanji>
        {word.kanji && <Reading>{word.reading}</Reading>}
      </Row>
      <Meaning>{word.meaning_ko}</Meaning>
      <BadgeRow>
        <Badge tone="info">{POS_LABEL_KO[word.part_of_speech]}</Badge>
        <Badge>{word.category}</Badge>
        {word.is_essential && <Badge tone="primary">필수</Badge>}
      </BadgeRow>
    </Main>
    {right && <RightSlot>{right}</RightSlot>}
  </Shell>
);
