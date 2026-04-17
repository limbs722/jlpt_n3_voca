import { notFound } from "next/navigation";

import { WordDetailPage } from "@/pages-fsd/word-detail";

interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  const wordId = Number(params.id);
  if (!Number.isFinite(wordId)) notFound();
  return <WordDetailPage wordId={wordId} />;
}
