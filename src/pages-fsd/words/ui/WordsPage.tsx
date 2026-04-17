'use client';

import styled from '@emotion/styled';

import { CategoryFilter, SearchBar } from '@/features/word-search';
import { Container, Stack } from '@/shared/ui/Container';
import { BottomNav } from '@/widgets/bottom-nav';
import { Header } from '@/widgets/header';
import { WordList } from '@/widgets/word-list';

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

const Main = styled.main`
  padding: ${({ theme }) => theme.spacing(5)} 0 ${({ theme }) => theme.spacing(10)};
`;
