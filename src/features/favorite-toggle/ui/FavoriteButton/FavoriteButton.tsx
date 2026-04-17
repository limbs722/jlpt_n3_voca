'use client';

import type { MouseEvent } from 'react';

import { useFavorites } from '@/entities/favorite';

import { Btn } from './FavoriteButton.style';

interface Props {
  wordId: number;
  size?: number;
}

export const FavoriteButton = ({ wordId, size = 22 }: Props) => {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(wordId);

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggle(wordId);
  };

  return (
    <Btn
      onClick={handleClick}
      $active={active}
      aria-label={active ? '즐겨찾기 해제' : '즐겨찾기'}
      $size={size}
      type="button"
    >
      {active ? '★' : '☆'}
    </Btn>
  );
};
