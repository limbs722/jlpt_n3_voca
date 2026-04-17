"use client";

import styled from "@emotion/styled";
import type { MouseEvent } from "react";

import { useFavorites } from "@/entities/favorite";
import { AppTheme } from "@/shared/ui/theme";

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
      aria-label={active ? "즐겨찾기 해제" : "즐겨찾기"}
      $size={size}
      type="button"
    >
      {active ? "★" : "☆"}
    </Btn>
  );
};

const Btn = styled.button<{ $active: boolean; $size: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => $size + 16}px;
  height: ${({ $size }) => $size + 16}px;
  background: transparent;
  border: none;
  font-size: ${({ $size }) => $size}px;
  line-height: 1;
  color: ${({ theme, $active }: { theme: AppTheme; $active: boolean }) =>
    $active ? theme.colors.primary : theme.colors.textSubtle};
  transition:
    transform 0.15s ease,
    color 0.15s ease;
  &:hover {
    transform: scale(1.1);
    color: ${({ theme }: { theme: AppTheme }) => theme.colors.primary};
  }
`;
