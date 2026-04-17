'use client';

import type { ButtonHTMLAttributes } from 'react';

import styled from '@emotion/styled';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

export const Button = ({ variant = 'primary', size = 'md', fullWidth = false, ...rest }: ButtonProps) => (
  <StyledButton $variant={variant} $size={size} $fullWidth={fullWidth} {...rest} />
);

const SIZE_MAP: Record<Size, { pad: string; font: string; height: string }> = {
  sm: { pad: '0 12px', font: '13px', height: '32px' },
  md: { pad: '0 16px', font: '14px', height: '40px' },
  lg: { pad: '0 22px', font: '16px', height: '48px' },
};

const StyledButton = styled.button<{
  $variant: Variant;
  $size: Size;
  $fullWidth: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid transparent;
  font-weight: 600;
  height: ${({ $size }) => SIZE_MAP[$size].height};
  padding: ${({ $size }) => SIZE_MAP[$size].pad};
  font-size: ${({ $size }) => SIZE_MAP[$size].font};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  transition:
    background 0.15s ease,
    transform 0.06s ease,
    box-shadow 0.15s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  ${({ theme, $variant }) => {
    switch ($variant) {
      case 'primary':
        return `
          background: ${theme.colors.primary};
          color: #fff;
          &:hover:not(:disabled) { background: ${theme.colors.primaryHover}; }
        `;
      case 'secondary':
        return `
          background: ${theme.colors.bgElevated};
          color: ${theme.colors.text};
          border-color: ${theme.colors.border};
          &:hover:not(:disabled) { background: ${theme.colors.surface}; }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: ${theme.colors.text};
          &:hover:not(:disabled) { background: ${theme.colors.surface}; }
        `;
      case 'danger':
        return `
          background: ${theme.colors.danger};
          color: #fff;
        `;
    }
  }}
`;
