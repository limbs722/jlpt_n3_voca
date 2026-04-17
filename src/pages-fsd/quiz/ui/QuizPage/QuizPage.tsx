'use client';

import { QuizRunner } from '@/features/quiz';
import { Container } from '@/shared/ui/Container';
import { BottomNav } from '@/widgets/bottom-nav';
import { Header } from '@/widgets/header';

import { Main } from './QuizPage.style';

export const QuizPage = () => (
  <>
    <Header title="퀴즈" showBack />
    <Container>
      <Main>
        <QuizRunner questionCount={10} />
      </Main>
    </Container>
    <BottomNav />
  </>
);
