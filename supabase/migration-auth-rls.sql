-- =====================================================================
--  AUTH RLS 마이그레이션
--  Google OAuth (Supabase Auth) 도입 후 실행하세요.
--  Supabase Studio > SQL Editor 에 붙여넣기 하거나
--  `supabase db push` 로 적용합니다.
-- =====================================================================

-- ─────────────────────────────────────────────
-- user_favorites: authenticated 유저는 auth.uid() 기반으로만 접근
-- ─────────────────────────────────────────────
drop policy if exists "favorites self access" on public.user_favorites;

-- 로그인한 유저: 자신의 row만 읽기/쓰기
create policy "favorites authenticated access" on public.user_favorites
  for all
  to authenticated
  using (user_id = auth.uid()::text)
  with check (user_id = auth.uid()::text);

-- 비로그인(anon) 유저: 기존 익명 UUID 방식 유지 (자유 접근)
-- 프로덕션에서 익명 접근을 막으려면 이 정책을 제거하세요.
create policy "favorites anon access" on public.user_favorites
  for all
  to anon
  using (true)
  with check (true);

-- ─────────────────────────────────────────────
-- user_progress: authenticated 유저는 auth.uid() 기반으로만 접근
-- ─────────────────────────────────────────────
drop policy if exists "progress self access" on public.user_progress;

-- 로그인한 유저: 자신의 row만 읽기/쓰기
create policy "progress authenticated access" on public.user_progress
  for all
  to authenticated
  using (user_id = auth.uid()::text)
  with check (user_id = auth.uid()::text);

-- 비로그인(anon) 유저: 기존 익명 UUID 방식 유지
create policy "progress anon access" on public.user_progress
  for all
  to anon
  using (true)
  with check (true);

-- ─────────────────────────────────────────────
-- (참고) Supabase Auth > Google Provider 설정 후
--   Redirect URL을 다음으로 등록하세요:
--   https://<your-domain>/auth/callback
-- ─────────────────────────────────────────────
