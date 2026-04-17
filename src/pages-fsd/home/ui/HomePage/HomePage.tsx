'use client';

import { APP_DESCRIPTION, ROUTES } from '@/shared/config/constants';
import { Card, CardSubtitle, CardTitle } from '@/shared/ui/Card';
import { Container, Stack } from '@/shared/ui/Container';
import { BottomNav } from '@/widgets/bottom-nav';
import { Header } from '@/widgets/header';
import { StatsDashboard } from '@/widgets/stats-dashboard';

import { Hero, HeroTitle, HeroDesc, Main, Shortcuts, ShortcutLink, ShortcutIcon } from './HomePage.style';

export const HomePage = () => (
  <>
    <Header />
    <Container>
      <Main>
        <Stack gap={5}>
          <Hero>
            <HeroTitle>오늘도 JLPT N3를 정복해 볼까요?</HeroTitle>
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
