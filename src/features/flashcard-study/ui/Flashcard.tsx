'use client';

import styled from '@emotion/styled';

import { POS_LABEL_KO, type Word } from '@/entities/word';
import { Badge } from '@/shared/ui/Badge';
import { AppTheme } from '@/shared/ui/theme';

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

const CardShell = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  max-height: 60dvh;
  perspective: 1200px;
  cursor: pointer;
`;

const faceBase = `
  position: absolute;
  inset: 0;
  border-radius: 16px;
  padding: 24px;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1);
`;

const FrontFace = styled('div', {
  shouldForwardProp: (prop) => prop !== '$flipped',
})<{ $flipped: boolean }>`
  ${faceBase}
  background: ${({ theme }: { theme: AppTheme }) => theme.colors.bgElevated};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.colors.border};
  box-shadow: ${({ theme }: { theme: AppTheme }) => theme.shadows.md};
  transform: rotateY(${({ $flipped }) => ($flipped ? '180deg' : '0deg')});
`;

const BackFace = styled('div', {
  shouldForwardProp: (prop) => prop !== '$flipped',
})<{ $flipped: boolean }>`
  ${faceBase}
  background: ${({ theme }: { theme: AppTheme }) => theme.colors.bgElevated};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.colors.border};
  box-shadow: ${({ theme }: { theme: AppTheme }) => theme.shadows.md};
  transform: rotateY(${({ $flipped }) => ($flipped ? '360deg' : '180deg')});
`;

const TopBadges = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  gap: 6px;
`;

const JpWord = styled.div`
  font-family: ${({ theme }: { theme: AppTheme }) => theme.fonts.jp};
  font-size: clamp(44px, 12vw, 64px);
  font-weight: 700;
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.text};
  text-align: center;
`;

const Reading = styled.div`
  font-family: ${({ theme }: { theme: AppTheme }) => theme.fonts.jp};
  font-size: 18px;
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.textMuted};
`;

const Meaning = styled.div`
  font-size: clamp(22px, 6vw, 30px);
  font-weight: 700;
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.text};
  text-align: center;
`;

const ExampleBlock = styled.div`
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px dashed ${({ theme }: { theme: AppTheme }) => theme.colors.border};
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 100%;
`;

const ExampleJp = styled.div`
  font-family: ${({ theme }: { theme: AppTheme }) => theme.fonts.jp};
  font-size: 15px;
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.text};
`;

const ExampleKo = styled.div`
  font-size: 13px;
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.textMuted};
`;

const Hint = styled.div`
  position: absolute;
  bottom: 16px;
  font-size: 12px;
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.textSubtle};
`;
