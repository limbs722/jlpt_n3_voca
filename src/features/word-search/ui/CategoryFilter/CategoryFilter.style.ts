import styled from '@emotion/styled';

import type { AppTheme } from '@/shared/ui/theme';

export const Wrap = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const Scroll = styled.div`
  flex: 1;
  display: flex;
  gap: 6px;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Chip = styled('button', {
  shouldForwardProp: (prop) => prop !== '$active',
})<{ $active: boolean }>`
  flex-shrink: 0;
  padding: 6px 14px;
  border-radius: ${({ theme }: { theme: AppTheme }) => theme.radii.pill};
  border: 1px solid
    ${({ theme, $active }: { theme: AppTheme; $active: boolean }) =>
      $active ? theme.colors.primary : theme.colors.border};
  background: ${({ theme, $active }: { theme: AppTheme; $active: boolean }) =>
    $active ? theme.colors.primary : theme.colors.bgElevated};
  color: ${({ theme, $active }: { theme: AppTheme; $active: boolean }) => ($active ? '#fff' : theme.colors.textMuted)};
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
`;

export const EssentialToggle = styled(Chip)``;
