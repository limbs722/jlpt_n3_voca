'use client';

import styled from '@emotion/styled';

type Tone = 'neutral' | 'primary' | 'success' | 'warning' | 'info';

export const Badge = styled.span<{ tone?: Tone }>`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: 11px;
  font-weight: 600;
  line-height: 1.6;
  letter-spacing: 0.02em;
  ${({ theme, tone = 'neutral' }) => {
    switch (tone) {
      case 'primary':
        return `background: ${theme.colors.primary}15; color: ${theme.colors.primary};`;
      case 'success':
        return `background: ${theme.colors.success}15; color: ${theme.colors.success};`;
      case 'warning':
        return `background: ${theme.colors.warning}18; color: ${theme.colors.warning};`;
      case 'info':
        return `background: ${theme.colors.accent}15; color: ${theme.colors.accent};`;
      default:
        return `background: ${theme.colors.surface}; color: ${theme.colors.textMuted};`;
    }
  }}
`;
