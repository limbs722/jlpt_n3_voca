// Hand-written mirror of what `supabase gen types typescript --linked` would
// produce for the schema defined in supabase/schema.sql. Keep the top-level
// shape (Tables / Views / Functions / Enums / CompositeTypes) in sync with
// Supabase's generator output so postgrest-js can infer Row types correctly.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type PartOfSpeech =
  | "noun"
  | "verb"
  | "i-adjective"
  | "na-adjective"
  | "adverb"
  | "conjunction"
  | "expression"
  | "other";

export type ProgressStatusDb = "new" | "learning" | "known";

export type Database = {
  public: {
    Tables: {
      words: {
        Row: {
          id: number;
          kanji: string | null;
          reading: string;
          meaning_ko: string;
          meaning_extra: string | null;
          part_of_speech: PartOfSpeech;
          category: string;
          frequency_rank: number | null;
          is_essential: boolean;
          created_at: string;
        };
        Insert: {
          id?: number;
          kanji?: string | null;
          reading: string;
          meaning_ko: string;
          meaning_extra?: string | null;
          part_of_speech?: PartOfSpeech;
          category?: string;
          frequency_rank?: number | null;
          is_essential?: boolean;
          created_at?: string;
        };
        Update: {
          id?: number;
          kanji?: string | null;
          reading?: string;
          meaning_ko?: string;
          meaning_extra?: string | null;
          part_of_speech?: PartOfSpeech;
          category?: string;
          frequency_rank?: number | null;
          is_essential?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      examples: {
        Row: {
          id: number;
          word_id: number;
          sentence_jp: string;
          sentence_ko: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          word_id: number;
          sentence_jp: string;
          sentence_ko: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          word_id?: number;
          sentence_jp?: string;
          sentence_ko?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "examples_word_id_fkey";
            columns: ["word_id"];
            isOneToOne: false;
            referencedRelation: "words";
            referencedColumns: ["id"];
          },
        ];
      };
      user_favorites: {
        Row: {
          id: number;
          user_id: string;
          word_id: number;
          created_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          word_id: number;
          created_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          word_id?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_favorites_word_id_fkey";
            columns: ["word_id"];
            isOneToOne: false;
            referencedRelation: "words";
            referencedColumns: ["id"];
          },
        ];
      };
      user_progress: {
        Row: {
          id: number;
          user_id: string;
          word_id: number;
          status: ProgressStatusDb;
          correct_count: number;
          incorrect_count: number;
          last_studied_at: string | null;
          updated_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          word_id: number;
          status?: ProgressStatusDb;
          correct_count?: number;
          incorrect_count?: number;
          last_studied_at?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          word_id?: number;
          status?: ProgressStatusDb;
          correct_count?: number;
          incorrect_count?: number;
          last_studied_at?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_progress_word_id_fkey";
            columns: ["word_id"];
            isOneToOne: false;
            referencedRelation: "words";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      part_of_speech: PartOfSpeech;
      progress_status: ProgressStatusDb;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
