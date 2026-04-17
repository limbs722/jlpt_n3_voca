import styled from '@emotion/styled';

import type { AppTheme } from '@/shared/ui/theme';

export const Summary = styled.div`
  background: ${({ theme }: { theme: AppTheme }) => theme.colors.bgElevated};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.colors.border};
  border-radius: ${({ theme }: { theme: AppTheme }) => theme.radii.lg};
  padding: ${({ theme }: { theme: AppTheme }) => theme.spacing(8)}px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`;

export const SummaryTitle = styled.h2`
  margin: 0;
  font-size: 18px;
`;

export const Score = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-top: 4px;
`;

export const ScoreNum = styled.span`
  font-size: 48px;
  font-weight: 800;
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.primary};
`;

export const ScoreSlash = styled.span`
  font-size: 24px;
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.textMuted};
`;

export const ScoreTotal = styled.span`
  font-size: 24px;
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.textMuted};
`;

export const Percent = styled.div`
  font-size: 16px;
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.text};
  font-weight: 600;
`;

export const Message = styled.p`
  margin: 0;
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.textMuted};
  font-size: 14px;
`;

export const Section = styled.section``;

export const SectionTitle = styled.h3`
  margin: 0 0 ${({ theme }: { theme: AppTheme }) => theme.spacing(2)}px;
  font-size: 15px;
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.text};
`;

export const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
