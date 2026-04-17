"use client";

import styled from "@emotion/styled";

import { QuizRunner } from "@/features/quiz";
import { Header } from "@/widgets/header";
import { BottomNav } from "@/widgets/bottom-nav";
import { Container } from "@/shared/ui/Container";

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

const Main = styled.main`
  padding: ${({ theme }) => theme.spacing(5)} 0 ${({ theme }) => theme.spacing(10)};
`;
