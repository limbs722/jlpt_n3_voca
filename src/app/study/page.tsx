"use client";

import { useSearchParams } from "next/navigation";

import { useFavorites } from "@/entities/favorite";
import { StudyPage } from "@/pages-fsd/study";

export default function Page() {
  const params = useSearchParams();
  const favoritesMode = params.get("favorites") === "1";
  const { favoriteIds } = useFavorites();

  return (
    <StudyPage
      title={favoritesMode ? "즐겨찾기 복습" : "플래시카드"}
      filterIds={favoritesMode ? favoriteIds : undefined}
    />
  );
}
