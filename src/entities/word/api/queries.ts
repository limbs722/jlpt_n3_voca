"use client";

import {
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";

import { SEED_WORDS } from "@/shared/config/seed-data/words";
import { getSupabaseBrowserClient } from "@/shared/lib/supabase/client";
import type { Database } from "@/shared/types/database";

import type { Word } from "../model/types";

export const WORD_QUERY_KEYS = {
  all: ["words"] as const,
  list: (filters?: { category?: string; essentialOnly?: boolean }) =>
    ["words", "list", filters ?? {}] as const,
  detail: (id: number) => ["words", "detail", id] as const,
};

type WordRow = Database["public"]["Tables"]["words"]["Row"];
type ExampleRow = Database["public"]["Tables"]["examples"]["Row"];

type WordWithExamplesRow = WordRow & {
  examples: Pick<ExampleRow, "id" | "sentence_jp" | "sentence_ko">[] | null;
};

const supabaseWordToWord = (
  row: WordRow,
  examples: Pick<ExampleRow, "id" | "sentence_jp" | "sentence_ko">[] = [],
): Word => ({
  id: row.id,
  kanji: row.kanji,
  reading: row.reading,
  meaning_ko: row.meaning_ko,
  meaning_extra: row.meaning_extra,
  part_of_speech: row.part_of_speech,
  category: row.category,
  frequency_rank: row.frequency_rank,
  is_essential: row.is_essential,
  examples: examples.map((e) => ({
    id: e.id,
    sentence_jp: e.sentence_jp,
    sentence_ko: e.sentence_ko,
  })),
});

const fetchWordsFromSupabase = async (): Promise<Word[] | null> => {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return null;

  const { data: words, error } = await supabase
    .from("words")
    .select(
      `id,kanji,reading,meaning_ko,meaning_extra,part_of_speech,category,
       frequency_rank,is_essential,created_at,
       examples ( id, sentence_jp, sentence_ko )`,
    )
    .order("frequency_rank", { ascending: true })
    .returns<WordWithExamplesRow[]>();

  if (error) {
    console.error("[words] supabase error", error);
    return null;
  }
  if (!words) return [];
  return words.map((row) => supabaseWordToWord(row, row.examples ?? []));
};

const fetchWords = async (): Promise<Word[]> => {
  const remote = await fetchWordsFromSupabase();
  if (remote && remote.length > 0) return remote;
  // fallback — offline / demo / unconfigured
  return SEED_WORDS;
};

export const useWordsQuery = (
  options?: Omit<UseQueryOptions<Word[]>, "queryKey" | "queryFn">,
) =>
  useQuery<Word[]>({
    queryKey: WORD_QUERY_KEYS.all,
    queryFn: fetchWords,
    ...options,
  });

export const useWordQuery = (id: number | null) =>
  useQuery<Word | null>({
    queryKey: id ? WORD_QUERY_KEYS.detail(id) : ["words", "detail", "null"],
    enabled: id !== null,
    queryFn: async () => {
      const all = await fetchWords();
      return all.find((w) => w.id === id) ?? null;
    },
  });
