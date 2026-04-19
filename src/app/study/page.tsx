'use client';

import { Suspense } from 'react';

import { useSearchParams } from 'next/navigation';

import { useFavorites } from '@/entities/favorite/api';
import { StudyPage } from '@/pages-fsd/study/ui';

// useSearchParams()를 사용하는 부분을 별도 컴포넌트로 분리
const StudyPageInner = () => {
  const params = useSearchParams();
  const favoritesMode = params.get('favorites') === '1';
  const { favoriteIds } = useFavorites();

  return (
    <StudyPage
      title={favoritesMode ? '즐겨찾기 복습' : '플래시카드'}
      filterIds={favoritesMode ? favoriteIds : undefined}
    />
  );
};

export default function Page() {
  return (
    <Suspense>
      <StudyPageInner />
    </Suspense>
  );
}
