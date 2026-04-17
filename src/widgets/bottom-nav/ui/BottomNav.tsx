'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styled from '@emotion/styled';

import { ROUTES } from '@/shared/config/constants';

const ITEMS: { href: string; label: string; icon: string; match: RegExp }[] = [
  { href: ROUTES.HOME, label: '홈', icon: '🏠', match: /^\/$/ },
  { href: ROUTES.STUDY, label: '학습', icon: '📖', match: /^\/study/ },
  { href: ROUTES.QUIZ, label: '퀴즈', icon: '📝', match: /^\/quiz/ },
  { href: ROUTES.FAVORITES, label: '즐겨찾기', icon: '★', match: /^\/favorites/ },
  { href: ROUTES.WORDS, label: '단어', icon: '📚', match: /^\/words/ },
];

export const BottomNav = () => {
  const pathname = usePathname() ?? '/';
  return (
    <Nav>
      {ITEMS.map((item) => {
        const active = item.match.test(pathname);
        return (
          <NavLink key={item.href} href={item.href} $active={active}>
            <Icon>{item.icon}</Icon>
            <Label>{item.label}</Label>
          </NavLink>
        );
      })}
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.nav};
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background: ${({ theme }) => theme.colors.bgElevated}f5;
  backdrop-filter: blur(10px);
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 4px 0 max(4px, env(safe-area-inset-bottom));
`;

const NavLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== '$active',
})<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 6px 0;
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.textSubtle)};
  transition: color 0.1s ease;
`;

const Icon = styled.span`
  font-size: 18px;
  line-height: 1;
`;

const Label = styled.span`
  font-size: 11px;
  font-weight: 600;
`;
