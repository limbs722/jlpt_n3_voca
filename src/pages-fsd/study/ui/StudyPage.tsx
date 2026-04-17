'use client';

import styled from '@emotion/styled';

import { FlashcardDeck } from '@/features/flashcard-study';
import { Container } from '@/shared/ui/Container';
import { BottomNav } from '@/widgets/bottom-nav';
import { Header } from '@/widgets/header';

interface Props {
  filterIds?: number[];
  title?: string;
}

export const StudyPage = ({ filterIds, title = '플래시카드' }: Props) => (
  <>
    <Header title={title} showBack />
    <Container>
      <Main>
        <FlashcardDeck filterIds={filterIds} />
      </Main>
    </Container>
    <BottomNav />
  </>
);

const Main = styled.main`
  padding: ${({ theme }) => theme.spacing(5)} 0 ${({ theme }) => theme.spacing(10)};
`;
