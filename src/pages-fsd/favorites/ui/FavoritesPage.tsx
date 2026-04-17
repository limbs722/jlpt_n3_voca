'use client';

import { useMemo } from 'react';

import Link from 'next/link';

import styled from '@emotion/styled';

import { useFavorites } from '@/entities/favorite';
import { useWordsQuery } from '@/entities/word';
import { ROUTES } from '@/shared/config/constants';
import { Button } from '@/shared/ui/Button';
import { Container, Row, Stack } from '@/shared/ui/Container';
import { BottomNav } from '@/widgets/bottom-nav';
import { Header } from '@/widgets/header';
import { WordList } from '@/widgets/word-list';

export const FavoritesPage = () => {
  const { favoriteIds } = useFavorites();
  const { data: words = [] } = useWordsQuery();

  const favoriteWords = useMemo(() => words.filter((w) => favoriteIds.includes(w.id)), [words, favoriteIds]);

  return (
    <>
      <Header title="즐겨찾기" showBack />
      <Container>
        <Main>
          <Stack gap={4}>
            <Summary>
              <Count>{favoriteWords.length}</Count>
              <CountLabel>개의 단어</CountLabel>
            </Summary>

            {favoriteWords.length > 0 && (
              <Row gap={2}>
                <Link href={`${ROUTES.STUDY}?favorites=1`} style={{ flex: 1 }}>
                  <Button fullWidth size="md">
                    플래시카드로 복습
                  </Button>
                </Link>
                <Link href={`${ROUTES.QUIZ}?favorites=1`} style={{ flex: 1 }}>
                  <Button fullWidth variant="secondary" size="md">
                    즐겨찾기로 퀴즈
                  </Button>
                </Link>
              </Row>
            )}

            <WordList
              words={favoriteWords}
              empty="아직 즐겨찾기한 단어가 없어요. 단어 카드 옆의 ★ 를 눌러 추가해 보세요."
            />
          </Stack>
        </Main>
      </Container>
      <BottomNav />
    </>
  );
};

const Main = styled.main`
  padding: ${({ theme }) => theme.spacing(5)} 0 ${({ theme }) => theme.spacing(10)};
`;

const Summary = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: ${({ theme }) => theme.spacing(2)} 0;
`;

const Count = styled.span`
  font-size: 28px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
`;

const CountLabel = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textMuted};
`;
