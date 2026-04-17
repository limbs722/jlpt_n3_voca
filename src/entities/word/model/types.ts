import type { PartOfSpeech } from "@/shared/types/database";

export interface Example {
  id?: number;
  sentence_jp: string;
  sentence_ko: string;
}

export interface Word {
  id: number;
  kanji: string | null;
  reading: string;
  meaning_ko: string;
  meaning_extra?: string | null;
  part_of_speech: PartOfSpeech;
  category: string;
  frequency_rank?: number | null;
  is_essential: boolean;
  examples: Example[];
}

export const POS_LABEL_KO: Record<PartOfSpeech, string> = {
  noun: "명사",
  verb: "동사",
  "i-adjective": "い형용사",
  "na-adjective": "な형용사",
  adverb: "부사",
  conjunction: "접속사",
  expression: "표현",
  other: "기타",
};

export const POS_LABEL_JP: Record<PartOfSpeech, string> = {
  noun: "名詞",
  verb: "動詞",
  "i-adjective": "形容詞",
  "na-adjective": "形容動詞",
  adverb: "副詞",
  conjunction: "接続詞",
  expression: "表現",
  other: "その他",
};
