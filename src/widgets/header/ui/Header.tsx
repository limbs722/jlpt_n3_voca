"use client";

import styled from "@emotion/styled";
import Link from "next/link";

import { LoginButton } from "@/features/auth";
import { APP_NAME } from "@/shared/config/constants";

interface Props {
  title?: string;
  showBack?: boolean;
  backHref?: string;
  right?: React.ReactNode;
  hideAuth?: boolean;
}

export const Header = ({ title, showBack, backHref = "/", right, hideAuth }: Props) => (
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

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.nav};
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors.bg}ee;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  height: 56px;
`;

const Left = styled.div``;

const Right = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Brand = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const Title = styled.h1`
  text-align: center;
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  background: transparent;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.text};
  &:hover {
    background: ${({ theme }) => theme.colors.surface};
  }
`;
