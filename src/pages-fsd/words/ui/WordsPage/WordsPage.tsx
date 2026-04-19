'use client';

import { CategoryFilter, SearchBar } from '@/features/word-search/ui';
import { Container, Stack } from '@/shared/ui/Container';
import { BottomNav } from '@/widgets/bottom-nav/ui';
import { Header } from '@/widgets/header/ui';
import { WordList } from '@/widgets/word-list/ui';

import { Main } from './WordsPage.style';

export const WordsPage = () => (
  <>
    <Header title="단어 목록" showBack />
    <Container>
      <Main>
        <Stack gap={4}>
          <SearchBar />
          <CategoryFilter />
          <WordList />
        </Stack>
      </Main>
    </Container>
    <BottomNav />
  </>
);
