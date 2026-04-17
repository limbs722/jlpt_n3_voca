'use client';

import { useAtomValue } from 'jotai';

import { useFavorites } from '@/entities/favorite';
import { statsAtom } from '@/entities/user-progress';
import { useWordsQuery } from '@/entities/word';

import { Cell, Grid, Label, Value } from './StatsDashboard.style';

export const StatsDashboard = () => {
  const stats = useAtomValue(statsAtom);
  const { favoriteIds } = useFavorites();
  const { data: words = [] } = useWordsQuery();

  const items = [
    { label: '전체 단어', value: words.length },
    { label: '학습 중', value: stats.learning },
    { label: '외운 단어', value: stats.known },
    { label: '즐겨찾기', value: favoriteIds.length },
  ];

  return (
    <Grid>
      {items.map((it) => (
        <Cell key={it.label}>
          <Value>{it.value}</Value>
          <Label>{it.label}</Label>
        </Cell>
      ))}
    </Grid>
  );
};
