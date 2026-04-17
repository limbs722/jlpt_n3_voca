-- =====================================================================
--  JLPT N3 Vocabulary App — Supabase Schema
--  Run on a new project:
--    supabase db reset            # local dev
--    or paste into Studio > SQL Editor for a cloud project.
-- =====================================================================

-- Extensions (usually enabled by default in Supabase)
create extension if not exists "pgcrypto";

-- =====================================================================
-- ENUMS
-- =====================================================================
do $$ begin
  create type part_of_speech as enum (
    'noun','verb','i-adjective','na-adjective','adverb',
    'conjunction','expression','other'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type progress_status as enum ('new','learning','known');
exception when duplicate_object then null; end $$;

-- =====================================================================
-- TABLES
-- =====================================================================
create table if not exists public.words (
  id              bigint generated always as identity primary key,
  kanji           text,
  reading         text not null,
  meaning_ko      text not null,
  meaning_extra   text,
  part_of_speech  part_of_speech not null default 'other',
  category        text not null default '기타',
  frequency_rank  integer,
  is_essential    boolean not null default false,
  created_at      timestamptz not null default now()
);

create index if not exists words_category_idx on public.words (category);
create index if not exists words_essential_idx on public.words (is_essential);
create index if not exists words_frequency_idx on public.words (frequency_rank);

create table if not exists public.examples (
  id              bigint generated always as identity primary key,
  word_id         bigint not null references public.words(id) on delete cascade,
  sentence_jp     text not null,
  sentence_ko     text not null,
  created_at      timestamptz not null default now()
);

create index if not exists examples_word_idx on public.examples (word_id);

create table if not exists public.user_favorites (
  id          bigint generated always as identity primary key,
  user_id     text not null,
  word_id     bigint not null references public.words(id) on delete cascade,
  created_at  timestamptz not null default now(),
  unique (user_id, word_id)
);

create index if not exists user_favorites_user_idx on public.user_favorites (user_id);

create table if not exists public.user_progress (
  id              bigint generated always as identity primary key,
  user_id         text not null,
  word_id         bigint not null references public.words(id) on delete cascade,
  status          progress_status not null default 'new',
  correct_count   integer not null default 0,
  incorrect_count integer not null default 0,
  last_studied_at timestamptz,
  updated_at      timestamptz not null default now(),
  unique (user_id, word_id)
);

create index if not exists user_progress_user_idx on public.user_progress (user_id);

-- =====================================================================
-- ROW LEVEL SECURITY
--  words / examples : public read (anon + authenticated).
--  user_* tables    : every row readable/writable by its owner (identified by user_id text).
--    * 익명 앱이므로 user_id 는 브라우저 생성 UUID.
--    * 프로덕션에서는 supabase auth 연동 시 user_id 를 auth.uid() 로 바꾸고
--      정책도 `using (user_id = auth.uid())` 로 교체하세요.
-- =====================================================================

alter table public.words          enable row level security;
alter table public.examples       enable row level security;
alter table public.user_favorites enable row level security;
alter table public.user_progress  enable row level security;

drop policy if exists "words read" on public.words;
create policy "words read" on public.words
  for select to anon, authenticated using (true);

drop policy if exists "examples read" on public.examples;
create policy "examples read" on public.examples
  for select to anon, authenticated using (true);

-- anonymous user_id 기반 정책 — 개발용. auth 도입 시 수정 권장.
drop policy if exists "favorites self access" on public.user_favorites;
create policy "favorites self access" on public.user_favorites
  for all to anon, authenticated using (true) with check (true);

drop policy if exists "progress self access" on public.user_progress;
create policy "progress self access" on public.user_progress
  for all to anon, authenticated using (true) with check (true);
