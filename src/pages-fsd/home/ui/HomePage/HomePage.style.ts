import Link from 'next/link';

import styled from '@emotion/styled';

export const Main = styled.main`
  padding: ${({ theme }) => theme.spacing(5)} 0 ${({ theme }) => theme.spacing(10)};
`;

export const Hero = styled.section`
  padding: ${({ theme }) => theme.spacing(4)} 0 ${({ theme }) => theme.spacing(2)};
`;

export const HeroTitle = styled.h1`
  margin: 0 0 ${({ theme }) => theme.spacing(2)};
  font-size: clamp(22px, 6vw, 28px);
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.text};
`;

export const HeroDesc = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.55;
`;

export const Shortcuts = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

export const ShortcutLink = styled(Link)`
  & > div {
    height: 100%;
    transition:
      border-color 0.15s ease,
      transform 0.1s ease;
  }
  &:hover > div {
    border-color: ${({ theme }) => theme.colors.primary};
  }
  &:active > div {
    transform: scale(0.99);
  }
`;

export const ShortcutIcon = styled.div`
  font-size: 22px;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;
