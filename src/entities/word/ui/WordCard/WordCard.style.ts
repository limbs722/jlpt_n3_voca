import styled from '@emotion/styled';

import type { AppTheme } from '@/shared/ui/theme';

export const Shell = styled.div<{ $clickable: boolean; $compact: boolean }>`
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

export const Main = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Row = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
`;

export const Kanji = styled.span`
  font-family: ${({ theme }: { theme: AppTheme }) => theme.fonts.jp};
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.text};
`;

export const Reading = styled.span`
  font-family: ${({ theme }: { theme: AppTheme }) => theme.fonts.jp};
  font-size: 14px;
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.textMuted};
`;

export const Meaning = styled.span`
  font-size: 14px;
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.text};
`;

export const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
`;

export const RightSlot = styled.div`
  flex-shrink: 0;
`;
