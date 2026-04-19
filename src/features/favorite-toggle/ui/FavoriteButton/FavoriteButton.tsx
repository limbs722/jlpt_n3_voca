'use client';

import { useState } from 'react';
import type { MouseEvent } from 'react';

import { useAuth } from '@/entities/auth/api';
import { useFavorites } from '@/entities/favorite/api';
import { LoginPromptModal } from '@/features/auth/ui';
import { isSupabaseConfigured } from '@/shared/config/env';

import { Btn } from './FavoriteButton.style';

interface Props {
  wordId: number;
  size?: number;
}

export const FavoriteButton = ({ wordId, size = 22 }: Props) => {
  const { isLoggedIn } = useAuth();
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(wordId);
  const [showPrompt, setShowPrompt] = useState(false);

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    // Supabase 미설정이거나 이미 로그인 상태면 바로 토글
    if (!isSupabaseConfigured || isLoggedIn) {
      toggle(wordId);
      return;
    }

    setShowPrompt(true);
  };

  return (
    <>
      <Btn
        onClick={handleClick}
        $active={active}
        aria-label={active ? '즐겨찾기 해제' : '즐겨찾기'}
        $size={size}
        type="button"
      >
        {active ? '★' : '☆'}
      </Btn>

      {showPrompt && (
        <LoginPromptModal
          description="즐겨찾기한 단어를 기기 간에 저장하려면 로그인이 필요해요."
          onClose={() => setShowPrompt(false)}
        />
      )}
    </>
  );
};
