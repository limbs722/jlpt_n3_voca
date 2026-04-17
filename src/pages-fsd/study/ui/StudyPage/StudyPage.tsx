'use client';

import { FlashcardDeck } from '@/features/flashcard-study';
import { Container } from '@/shared/ui/Container';
import { BottomNav } from '@/widgets/bottom-nav';
import { Header } from '@/widgets/header';

import { Main } from './StudyPage.style';

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
