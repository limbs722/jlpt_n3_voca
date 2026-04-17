"use client";

import styled from "@emotion/styled";
import Link from "next/link";

import { Header } from "@/widgets/header";
import { BottomNav } from "@/widgets/bottom-nav";
import { StatsDashboard } from "@/widgets/stats-dashboard";
import { APP_DESCRIPTION, ROUTES } from "@/shared/config/constants";
import { Container, Stack } from "@/shared/ui/Container";
import { Card, CardSubtitle, CardTitle } from "@/shared/ui/Card";

export const HomePage = () => (
  <>
    <Header />
    <Container>
      <Main>
        <Stack gap={5}>
          <Hero>
            <HeroTitle>
              오늘도{" "}
              <Accent>5분만</Accent>, <br />
              JLPT N3를 정복해 볼까요?
            </HeroTitle>
            <HeroDesc>{APP_DESCRIPTION}</HeroDesc>
          </Hero>

          <StatsDashboard />

          <Shortcuts>
            <ShortcutLink href={ROUTES.STUDY}>
              <Card>
                <ShortcutIcon>📖</ShortcutIcon>
                <CardTitle>플래시카드</CardTitle>
                <CardSubtitle>빈출 단어를 뒤집어 보며 외우기</CardSubtitle>
              </Card>
            </ShortcutLink>
            <ShortcutLink href={ROUTES.QUIZ}>
              <Card>
                <ShortcutIcon>📝</ShortcutIcon>
                <CardTitle>퀴즈 모드</CardTitle>
                <CardSubtitle>4지선다로 실력 점검하기</CardSubtitle>
              </Card>
            </ShortcutLink>
            <ShortcutLink href={ROUTES.FAVORITES}>
              <Card>
                <ShortcutIcon>★</ShortcutIcon>
                <CardTitle>즐겨찾기 복습</CardTitle>
                <CardSubtitle>내가 표시한 단어만 모아 학습</CardSubtitle>
              </Card>
            </ShortcutLink>
            <ShortcutLink href={ROUTES.WORDS}>
              <Card>
                <ShortcutIcon>📚</ShortcutIcon>
                <CardTitle>전체 단어 목록</CardTitle>
                <CardSubtitle>카테고리별로 훑어보기</CardSubtitle>
              </Card>
            </ShortcutLink>
          </Shortcuts>
        </Stack>
      </Main>
    </Container>
    <BottomNav />
  </>
);

const Main = styled.main`
  padding: ${({ theme }) => theme.spacing(5)} 0 ${({ theme }) => theme.spacing(10)};
`;

const Hero = styled.section`
  padding: ${({ theme }) => theme.spacing(4)} 0 ${({ theme }) => theme.spacing(2)};
`;

const HeroTitle = styled.h1`
  margin: 0 0 ${({ theme }) => theme.spacing(2)};
  font-size: clamp(22px, 6vw, 28px);
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.text};
`;

const Accent = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

const HeroDesc = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.55;
`;

const Shortcuts = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const ShortcutLink = styled(Link)`
  & > div {
    height: 100%;
    transition: border-color 0.15s ease, transform 0.1s ease;
  }
  &:hover > div {
    border-color: ${({ theme }) => theme.colors.primary};
  }
  &:active > div {
    transform: scale(0.99);
  }
`;

const ShortcutIcon = styled.div`
  font-size: 22px;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;
