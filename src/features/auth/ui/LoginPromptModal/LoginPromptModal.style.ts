'use client';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(20px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0)     scale(1); }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.overlay};
  z-index: ${({ theme }) => theme.zIndex.modal};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(4)};
  animation: ${fadeIn} 0.2s ease;
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.bgElevated};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: ${({ theme }) => theme.spacing(7)};
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(4)};
  animation: ${slideUp} 0.25s ease;
  position: relative;
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing(3)};
  right: ${({ theme }) => theme.spacing(3)};
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: none;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s;
  &:hover {
    background: ${({ theme }) => theme.colors.border};
  }
`;

export const IconWrap = styled.div`
  font-size: 40px;
  line-height: 1;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;

export const Desc = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
`;

export const GoogleBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 46px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bgElevated};
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.15s,
    box-shadow 0.15s;
  &:hover {
    background: ${({ theme }) => theme.colors.surface};
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`;

export const LaterBtn = styled.button`
  background: none;
  border: none;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSubtle};
  cursor: pointer;
  padding: 2px 0;
  &:hover {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;
