import styled from '@emotion/styled';

import type { AppTheme } from '@/shared/ui/theme';

export const Btn = styled('button', {
  shouldForwardProp: (prop) => prop !== '$active' && prop !== '$size',
})<{ $active: boolean; $size: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => $size + 16}px;
  height: ${({ $size }) => $size + 16}px;
  background: transparent;
  border: none;
  font-size: ${({ $size }) => $size}px;
  line-height: 1;
  color: ${({ theme, $active }: { theme: AppTheme; $active: boolean }) =>
    $active ? theme.colors.primary : theme.colors.textSubtle};
  transition:
    transform 0.15s ease,
    color 0.15s ease;
  &:hover {
    transform: scale(1.1);
    color: ${({ theme }: { theme: AppTheme }) => theme.colors.primary};
  }
`;
