'use client';

import { POS_LABEL_JP, POS_LABEL_KO, useWordQuery, type Word } from '@/entities/word';
import { FavoriteButton } from '@/features/favorite-toggle';
import { Badge } from '@/shared/ui/Badge';
import { Container, Stack } from '@/shared/ui/Container';
import { BottomNav } from '@/widgets/bottom-nav';
import { Header } from '@/widgets/header';

import {
  BadgeRow,
  Example,
  Hero,
  Info,
  Jp,
  Kanji,
  Ko,
  Main,
  Meaning,
  Reading,
  Section,
  SectionTitle,
  SubPos,
} from './WordDetailPage.style';

interface Props {
  wordId: number;
}

export const WordDetailPage = ({ wordId }: Props) => {
  const { data: word, isLoading } = useWordQuery(wordId);

  return (
    <>
      <Header title="단어 상세" showBack right={word ? <FavoriteButton wordId={word.id} /> : null} />
      <Container>
        <Main>
          {isLoading && <Info>불러오는 중…</Info>}
          {!isLoading && !word && <Info>단어를 찾을 수 없습니다.</Info>}
          {word && <DetailBody word={word} />}
        </Main>
      </Container>
      <BottomNav />
    </>
  );
};

const DetailBody = ({ word }: { word: Word }) => (
  <Stack gap={5}>
    <Hero>
      <BadgeRow>
        <Badge tone="info">{POS_LABEL_KO[word.part_of_speech]}</Badge>
        <Badge>{word.category}</Badge>
        {word.is_essential && <Badge tone="primary">필수</Badge>}
      </BadgeRow>
      <Kanji>{word.kanji ?? word.reading}</Kanji>
      {word.kanji && <Reading>{word.reading}</Reading>}
      <Meaning>{word.meaning_ko}</Meaning>
      <SubPos>{POS_LABEL_JP[word.part_of_speech]}</SubPos>
    </Hero>

    {word.examples.length > 0 && (
      <Section>
        <SectionTitle>예문</SectionTitle>
        <Stack gap={2}>
          {word.examples.map((ex, idx) => (
            <Example key={ex.id ?? idx}>
              <Jp>{ex.sentence_jp}</Jp>
              <Ko>{ex.sentence_ko}</Ko>
            </Example>
          ))}
        </Stack>
      </Section>
    )}
  </Stack>
);
