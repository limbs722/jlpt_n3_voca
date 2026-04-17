'use client';

import { usePathname } from 'next/navigation';

import { ROUTES } from '@/shared/config/constants';

import { Icon, Label, Nav, NavLink } from './BottomNav.style';

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
