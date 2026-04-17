import styled from '@emotion/styled';

import type { AppTheme } from '@/shared/ui/theme';

export const CardShell = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  max-height: 60dvh;
  perspective: 1200px;
  cursor: pointer;
`;

export const faceBase = `
  position: absolute;
  inset: 0;
  border-radius: 16px;
  padding: 24px;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1);
`;

export const FrontFace = styled('div', {
  shouldForwardProp: (prop) => prop !== '$flipped',
})<{ $flipped: boolean }>`
  ${faceBase}
  background: ${({ theme }: { theme: AppTheme }) => theme.colors.bgElevated};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.colors.border};
  box-shadow: ${({ theme }: { theme: AppTheme }) => theme.shadows.md};
  transform: rotateY(${({ $flipped }) => ($flipped ? '180deg' : '0deg')});
`;

export const BackFace = styled('div', {
  shouldForwardProp: (prop) => prop !== '$flipped',
})<{ $flipped: boolean }>`
  ${faceBase}
  background: ${({ theme }: { theme: AppTheme }) => theme.colors.bgElevated};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.colors.border};
  box-shadow: ${({ theme }: { theme: AppTheme }) => theme.shadows.md};
  transform: rotateY(${({ $flipped }) => ($flipped ? '360deg' : '180deg')});
`;

export const TopBadges = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  gap: 6px;
`;

export const JpWord = styled.div`
  font-family: ${({ theme }: { theme: AppTheme }) => theme.fonts.jp};
  font-size: clamp(44px, 12vw, 64px);
  font-weight: 700;
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.text};
  text-align: center;
`;

export const Reading = styled.div`
  font-family: ${({ theme }: { theme: AppTheme }) => theme.fonts.jp};
  font-size: 18px;
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.textMuted};
`;

export const Meaning = styled.div`
  font-size: clamp(22px, 6vw, 30px);
  font-weight: 700;
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.text};
  text-align: center;
`;

export const ExampleBlock = styled.div`
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px dashed ${({ theme }: { theme: AppTheme }) => theme.colors.border};
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 100%;
`;

export const ExampleJp = styled.div`
  font-family: ${({ theme }: { theme: AppTheme }) => theme.fonts.jp};
  font-size: 15px;
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.text};
`;

export const ExampleKo = styled.div`
  font-size: 13px;
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.textMuted};
`;

export const Hint = styled.div`
  position: absolute;
  bottom: 16px;
  font-size: 12px;
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.textSubtle};
`;
