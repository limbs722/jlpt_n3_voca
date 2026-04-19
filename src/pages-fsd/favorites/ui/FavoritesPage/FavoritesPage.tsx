'use client';

import { useMemo } from 'react';

import Link from 'next/link';

import { useFavorites } from '@/entities/favorite/api';
import { useWordsQuery } from '@/entities/word/api';
import { LoginBanner } from '@/features/auth/ui';
import { ROUTES } from '@/shared/config/constants';
import { Button } from '@/shared/ui/Button';
import { Container, Row, Stack } from '@/shared/ui/Container';
import { BottomNav } from '@/widgets/bottom-nav/ui';
import { Header } from '@/widgets/header/ui';
import { WordList } from '@/widgets/word-list/ui';

import { Count, CountLabel, Main, Summary } from './FavoritesPage.style';

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
            <LoginBanner message="즐겨찾기가 모든 기기에서 동기화돼요." />

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
