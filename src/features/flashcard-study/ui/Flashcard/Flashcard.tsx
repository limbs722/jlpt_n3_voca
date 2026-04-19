'use client';

import { POS_LABEL_KO, type Word } from '@/entities/word/model';
import { Badge } from '@/shared/ui/Badge';

import {
  BackFace,
  CardShell,
  ExampleBlock,
  ExampleJp,
  ExampleKo,
  FrontFace,
  Hint,
  JpWord,
  Meaning,
  Reading,
  TopBadges,
} from './Flashcard.style';

interface Props {
  word: Word;
  flipped: boolean;
  onFlip: () => void;
}

export const Flashcard = ({ word, flipped, onFlip }: Props) => (
  <CardShell onClick={onFlip}>
    <FrontFace $flipped={flipped}>
      <TopBadges>
        <Badge tone="info">{POS_LABEL_KO[word.part_of_speech]}</Badge>
        <Badge>{word.category}</Badge>
      </TopBadges>
      <JpWord>{word.kanji ?? word.reading}</JpWord>
      {word.kanji && <Reading>{word.reading}</Reading>}
      <Hint>탭해서 뜻 보기</Hint>
    </FrontFace>
    <BackFace $flipped={flipped}>
      <TopBadges>{word.is_essential && <Badge tone="primary">필수</Badge>}</TopBadges>
      <Meaning>{word.meaning_ko}</Meaning>
      {word.examples.length > 0 && (
        <ExampleBlock>
          <ExampleJp>{word.examples[0].sentence_jp}</ExampleJp>
          <ExampleKo>{word.examples[0].sentence_ko}</ExampleKo>
        </ExampleBlock>
      )}
      <Hint>탭해서 원어 보기</Hint>
    </BackFace>
  </CardShell>
);
