import styled from '@emotion/styled';

import type { AppTheme } from '@/shared/ui/theme';

export const Info = styled.p`
  text-align: center;
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.textMuted};
  padding: ${({ theme }: { theme: AppTheme }) => theme.spacing(8)}px 0;
`;

export const StartCard = styled.div`
  background: ${({ theme }: { theme: AppTheme }) => theme.colors.bgElevated};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.colors.border};
  border-radius: ${({ theme }: { theme: AppTheme }) => theme.radii.lg};
  padding: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
`;

export const StartTitle = styled.h2`
  font-size: 22px;
  margin: 0;
`;

export const StartDesc = styled.p`
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.textMuted};
  font-size: 14px;
  margin: 0 0 8px;
  line-height: 1.6;
  max-width: 320px;
`;

export const BarWrap = styled.div`
  position: relative;
  height: 6px;
  border-radius: 3px;
  background: ${({ theme }: { theme: AppTheme }) => theme.colors.surface};
  overflow: hidden;
`;

export const BarFill = styled.div`
  position: absolute;
  inset: 0 auto 0 0;
  background: ${({ theme }: { theme: AppTheme }) => theme.colors.primary};
  transition: width 0.3s ease;
`;

export const BarLabel = styled.span`
  display: none;
`;
