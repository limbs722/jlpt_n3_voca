'use client';

import { LoginBanner } from '@/features/auth/ui';
import { QuizRunner } from '@/features/quiz/ui';
import { Container, Stack } from '@/shared/ui/Container';
import { BottomNav } from '@/widgets/bottom-nav/ui';
import { Header } from '@/widgets/header/ui';

import { Main } from './QuizPage.style';

export const QuizPage = () => (
  <>
    <Header title="퀴즈" showBack />
    <Container>
      <Main>
        <Stack gap={4}>
          <LoginBanner message="퀴즈 결과와 틀린 문제가 저장돼요." />
          <QuizRunner questionCount={10} />
        </Stack>
      </Main>
    </Container>
    <BottomNav />
  </>
);
