'use client';

import { LoginButton } from '@/features/auth';
import { APP_NAME } from '@/shared/config/constants';

import { BackLink, Bar, Brand, Left, Right, Title } from './Header.style';

interface Props {
  title?: string;
  showBack?: boolean;
  backHref?: string;
  right?: React.ReactNode;
  hideAuth?: boolean;
}

export const Header = ({ title, showBack, backHref = '/', right, hideAuth }: Props) => (
  <Bar>
    <Left>
      {showBack ? (
        <BackLink href={backHref} aria-label="뒤로 가기">
          ←
        </BackLink>
      ) : (
        <Brand>{APP_NAME}</Brand>
      )}
    </Left>
    {title && <Title>{title}</Title>}
    <Right>
      {right}
      {!hideAuth && <LoginButton />}
    </Right>
  </Bar>
);
