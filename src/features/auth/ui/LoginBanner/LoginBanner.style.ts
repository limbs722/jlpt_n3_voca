'use client';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const Banner = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => `${theme.spacing(3)} ${theme.spacing(4)}`};
  animation: ${slideDown} 0.2s ease;
`;

export const BannerIcon = styled.span`
  font-size: 20px;
  flex-shrink: 0;
`;

export const BannerText = styled.p`
  margin: 0;
  flex: 1;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.5;

  strong {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
  }
`;

export const LoginLink = styled.button`
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
  white-space: nowrap;
  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;

export const DismissBtn = styled.button`
  flex-shrink: 0;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
  padding: 2px;
  &:hover {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;
