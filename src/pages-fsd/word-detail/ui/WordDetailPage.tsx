'use client';

import styled from '@emotion/styled';

import { POS_LABEL_JP, POS_LABEL_KO, useWordQuery, type Word } from '@/entities/word';
import { FavoriteButton } from '@/features/favorite-toggle';
import { Badge } from '@/shared/ui/Badge';
import { Container, Stack } from '@/shared/ui/Container';
import { BottomNav } from '@/widgets/bottom-nav';
import { Header } from '@/widgets/header';

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

const Main = styled.main`
  padding: ${({ theme }) => theme.spacing(5)} 0 ${({ theme }) => theme.spacing(10)};
`;

const Info = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: ${({ theme }) => theme.spacing(10)} 0;
`;

const Hero = styled.section`
  background: ${({ theme }) => theme.colors.bgElevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing(8)} ${({ theme }) => theme.spacing(5)};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

const BadgeRow = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 8px;
`;

const Kanji = styled.div`
  font-family: ${({ theme }) => theme.fonts.jp};
  font-size: clamp(44px, 11vw, 64px);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const Reading = styled.div`
  font-family: ${({ theme }) => theme.fonts.jp};
  font-size: 18px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Meaning = styled.div`
  margin-top: ${({ theme }) => theme.spacing(2)};
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const SubPos = styled.div`
  font-family: ${({ theme }) => theme.fonts.jp};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSubtle};
`;

const Section = styled.section``;

const SectionTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing(2)};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Example = styled.div`
  background: ${({ theme }) => theme.colors.bgElevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing(4)};
`;

const Jp = styled.div`
  font-family: ${({ theme }) => theme.fonts.jp};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

const Ko = styled.div`
  margin-top: 4px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
`;
