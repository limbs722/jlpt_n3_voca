import styled from '@emotion/styled';
import Link from 'next/link';

export const Nav = styled.nav`
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

export const NavLink = styled(Link, {
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

export const Icon = styled.span`
  font-size: 18px;
  line-height: 1;
`;

export const Label = styled.span`
  font-size: 11px;
  font-weight: 600;
`;
