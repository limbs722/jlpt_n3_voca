'use client';

import type { ReactNode } from 'react';

import styled from '@emotion/styled';

import { Badge } from '@/shared/ui/Badge';
import { AppTheme } from '@/shared/ui/theme';

import { POS_LABEL_KO, type Word } from '../model/types';

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

const Shell = styled.div<{ $clickable: boolean; $compact: boolean }>`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  padding: ${({ theme, $compact }: { theme: AppTheme; $compact: boolean }) =>
    $compact ? theme.spacing(3) : theme.spacing(4)};
  background: ${({ theme }: { theme: AppTheme }) => theme.colors.bgElevated};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.colors.border};
  border-radius: ${({ theme }: { theme: AppTheme }) => theme.radii.lg};
  cursor: ${({ $clickable }: { $clickable: boolean }) => ($clickable ? 'pointer' : 'default')};
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &:hover {
    border-color: ${({ theme, $clickable }: { theme: AppTheme; $clickable: boolean }) =>
      $clickable ? theme.colors.primary : theme.colors.border};
    box-shadow: ${({ theme, $clickable }: { theme: AppTheme; $clickable: boolean }) =>
      $clickable ? theme.shadows.sm : 'none'};
  }
`;

const Main = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Row = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
`;

const Kanji = styled.span`
  font-family: ${({ theme }: { theme: AppTheme }) => theme.fonts.jp};
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.text};
`;

const Reading = styled.span`
  font-family: ${({ theme }: { theme: AppTheme }) => theme.fonts.jp};
  font-size: 14px;
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.textMuted};
`;

const Meaning = styled.span`
  font-size: 14px;
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.text};
`;

const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
`;

const RightSlot = styled.div`
  flex-shrink: 0;
`;
