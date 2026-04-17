'use client';

import Link from 'next/link';

import styled from '@emotion/styled';

import { Button } from '@/shared/ui/Button';

export default function NotFound() {
  return (
    <Wrap>
      <Icon>🗒️</Icon>
      <Title>페이지를 찾을 수 없어요</Title>
      <Desc>요청하신 페이지가 존재하지 않거나 이동되었습니다.</Desc>
      <Link href="/">
        <Button size="lg">홈으로 돌아가기</Button>
      </Link>
    </Wrap>
  );
}

const Wrap = styled.main`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 32px;
`;

const Icon = styled.div`
  font-size: 40px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 20px;
`;

const Desc = styled.p`
  margin: 0 0 8px;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
`;
