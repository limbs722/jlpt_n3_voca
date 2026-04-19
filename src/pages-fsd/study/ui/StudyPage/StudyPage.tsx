'use client';

import { LoginBanner } from '@/features/auth/ui';
import { FlashcardDeck } from '@/features/flashcard-study/ui';
import { Container, Stack } from '@/shared/ui/Container';
import { BottomNav } from '@/widgets/bottom-nav/ui';
import { Header } from '@/widgets/header/ui';

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
        <Stack gap={4}>
          <LoginBanner message="학습 진행도가 저장돼요." />
          <FlashcardDeck filterIds={filterIds} />
        </Stack>
      </Main>
    </Container>
    <BottomNav />
  </>
);
