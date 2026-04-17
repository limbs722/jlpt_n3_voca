"use client";

import styled from "@emotion/styled";
import { useAtomValue } from "jotai";

import { useFavorites } from "@/entities/favorite";
import { statsAtom } from "@/entities/user-progress";
import { useWordsQuery } from "@/entities/word";

export const StatsDashboard = () => {
  const stats = useAtomValue(statsAtom);
  const { favoriteIds } = useFavorites();
  const { data: words = [] } = useWordsQuery();

  const items = [
    { label: "전체 단어", value: words.length },
    { label: "학습 중", value: stats.learning },
    { label: "외운 단어", value: stats.known },
    { label: "즐겨찾기", value: favoriteIds.length },
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
`;

const Cell = styled.div`
  background: ${({ theme }) => theme.colors.bgElevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing(3)};
  text-align: center;
`;

const Value = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const Label = styled.div`
  margin-top: 2px;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
`;
