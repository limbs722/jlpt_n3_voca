'use client';

import { useMemo } from 'react';

import Link from 'next/link';

import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';

import {
  WordCard,
  searchQueryAtom,
  selectedCategoryAtom,
  showEssentialOnlyAtom,
  useWordsQuery,
  type Word,
} from '@/entities/word';
import { FavoriteButton } from '@/features/favorite-toggle';
import { ROUTES } from '@/shared/config/constants';

interface Props {
  words?: Word[];
  empty?: React.ReactNode;
}

export const WordList = ({ words: overrideWords, empty }: Props) => {
  const { data: fetched = [], isLoading } = useWordsQuery();
  const search = useAtomValue(searchQueryAtom);
  const category = useAtomValue(selectedCategoryAtom);
  const essentialOnly = useAtomValue(showEssentialOnlyAtom);

  const source = overrideWords ?? fetched;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return source.filter((w) => {
      if (category !== '전체' && w.category !== category) return false;
      if (essentialOnly && !w.is_essential) return false;
      if (!q) return true;
      return (
        (w.kanji ?? '').toLowerCase().includes(q) ||
        w.reading.toLowerCase().includes(q) ||
        w.meaning_ko.toLowerCase().includes(q)
      );
    });
  }, [source, search, category, essentialOnly]);

  if (isLoading) return <Info>로딩 중…</Info>;
  if (filtered.length === 0) return <Info>{empty ?? '해당 조건에 맞는 단어가 없습니다.'}</Info>;

  return (
    <List>
      {filtered.map((w) => (
        <Link key={w.id} href={ROUTES.WORD_DETAIL(w.id)} legacyBehavior>
          <a style={{ textDecoration: 'none', color: 'inherit' }}>
            <WordCard word={w} onClick={() => {}} right={<FavoriteButton wordId={w.id} />} />
          </a>
        </Link>
      ))}
    </List>
  );
};

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Info = styled.p`
  text-align: center;
  padding: ${({ theme }) => theme.spacing(10)} 0;
  color: ${({ theme }) => theme.colors.textMuted};
`;
