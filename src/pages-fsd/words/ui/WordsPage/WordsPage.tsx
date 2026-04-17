'use client';

import { CategoryFilter, SearchBar } from '@/features/word-search';
import { Container, Stack } from '@/shared/ui/Container';
import { BottomNav } from '@/widgets/bottom-nav';
import { Header } from '@/widgets/header';
import { WordList } from '@/widgets/word-list';

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
