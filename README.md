# JLPT N3 단어장

JLPT N3 기출 빈출 & 필수 단어를 플래시카드, 4지선다 퀴즈, 즐겨찾기 복습으로 학습할 수 있는 **Next.js + PWA** 앱입니다.

## ✨ Stack

| 영역      | 기술                                                               |
| --------- | ------------------------------------------------------------------ |
| 프레임워크 | Next.js 14 (App Router) / TypeScript                              |
| 아키텍처  | **Feature-Sliced Design** (`app` / `pages-fsd` / `widgets` / `features` / `entities` / `shared`) |
| 스타일    | Emotion (`@emotion/react`, `@emotion/styled`) + SSR cache registry |
| 상태 관리 | **Jotai** (클라이언트 상태 & 로컬 저장소 동기화)                    |
| 서버 상태 | **TanStack Query** (Supabase 쿼리 캐시)                            |
| 데이터    | **Supabase** (Postgres + RLS) — 미설정 시 번들된 시드 JSON으로 fallback |
| PWA       | `next-pwa` — service worker, 오프라인 캐싱, 설치 가능               |

## 🗂️ 프로젝트 구조 (FSD)

```
src/
├─ app/                  # Next.js App Router (routes + layout)
├─ app-providers/        # ThemeProvider, QueryClient, Jotai, Emotion
├─ pages-fsd/            # FSD "pages" 레이어 (home, study, quiz, favorites, words, word-detail)
├─ widgets/              # header, bottom-nav, word-list, stats-dashboard
├─ features/             # flashcard-study, quiz, favorite-toggle, word-search
├─ entities/             # word, favorite, user-progress (모델 + 쿼리 + UI)
└─ shared/               # config, lib, types, ui kit, seed-data
```

> Next.js가 `src/pages/` 폴더를 자동 감지(Pages Router)하는 것을 피하기 위해 FSD의 pages 레이어는 `src/pages-fsd/` 로 분리했습니다. `tsconfig.json`의 `@/pages-fsd/*` alias로 import 합니다.

## 🚀 시작하기

```bash
# 1. 의존성 설치
npm install

# 2. 환경변수 파일 만들기 (Supabase 쓰려면)
cp .env.example .env.local
# NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY 채워넣기

# 3. 개발 서버
npm run dev
```

Supabase 환경 변수가 없으면 번들된 **220+ 단어 시드 데이터**(`src/shared/config/seed-data/words.ts`)로 자동 fallback 합니다. 즐겨찾기·학습 진도는 `localStorage`에 저장되어 오프라인에서도 동작합니다.

## 🗄️ Supabase 세팅

1. [Supabase](https://supabase.com) 에 새 프로젝트 생성.
2. `supabase/schema.sql` 을 Dashboard → SQL Editor 에 붙여넣고 실행.
3. 프로젝트 루트에서 시드 스크립트 실행 (서비스 롤 키 필요, 서버 전용):

```bash
export NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOi..."   # 절대 브라우저 노출 X
npx tsx scripts/seed-supabase.mjs
```

4. `src/shared/types/database.ts` 는 스키마의 손수 작성 복제본입니다. 프로덕션에서는 `supabase gen types typescript --linked > src/shared/types/database.ts` 로 덮어쓰기를 권장합니다.

### RLS 안내

`schema.sql` 의 RLS 정책은 **익명 user_id(브라우저 UUID) 기반**입니다. `supabase.auth` 로 인증을 도입하면 `user_id` 컬럼을 `auth.uid()` 로 마이그레이션하고 정책도 `using (user_id = auth.uid())` 로 바꿔주세요.

## 📱 PWA

- `public/manifest.webmanifest` — 앱 메타데이터 + shortcuts (플래시카드, 퀴즈)
- `public/icons/` — 192 / 512 / maskable 아이콘 (자동 생성됨)
- `next.config.mjs` 의 `next-pwa` 런타임 캐싱:
  - Google Fonts · 이미지 → CacheFirst
  - `/api/*` → NetworkFirst (8초 타임아웃, 1일 캐시)

개발 모드에서는 비활성화(`disable: process.env.NODE_ENV === "development"`). 프로덕션 빌드(`npm run build && npm start`)에서만 service worker가 등록됩니다.

## 🧩 주요 기능

| 경로            | 기능                                                              |
| --------------- | ----------------------------------------------------------------- |
| `/`             | 홈 — 학습 통계 + 빠른 이동                                         |
| `/study`        | 플래시카드 덱 (랜덤 20개, "외웠어요 / 모르겠어요" 로 진도 업데이트) |
| `/study?favorites=1` | 즐겨찾기 단어로만 플래시카드 복습                             |
| `/quiz`         | 4지선다 퀴즈 10문항 → 결과 + 틀린 단어 복습                         |
| `/favorites`    | 즐겨찾기 단어 목록 + 복습/퀴즈 바로가기                            |
| `/words`        | 전체 단어 목록 (검색 · 카테고리 · 필수만 필터)                      |
| `/words/[id]`   | 단어 상세 (원어 · 읽는 법 · 뜻 · 예문)                              |

## 🧠 데이터 흐름 요약

- **단어 조회**: `useWordsQuery()` → Supabase `words + examples` 조인 → 실패 시 `SEED_WORDS` fallback.
- **즐겨찾기**: `useFavorites()` (TanStack Query + Jotai). 원격 Supabase 성공 시 원격 우선, 동시에 `atomWithStorage` 로 로컬 미러링. 낙관적 업데이트 적용.
- **학습 진도**: 전부 클라이언트 `atomWithStorage` 에 저장 (`localStorage`). `recordAnswerAtom` 으로 정/오답 누적 → `status = new | learning | known` 자동 전이.

## 🧪 더 늘리기

- 단어 데이터 확장: `src/shared/config/seed-data/words.ts` 에 객체 추가 → `npx tsx scripts/seed-supabase.mjs` 로 업서트.
- 오디오(TTS/음성) 재생, SRS(간격 반복) 알고리즘, Supabase Auth 로그인 등을 features 레이어에 신규 슬라이스로 추가해 확장하기 좋은 구조입니다.

---

즐거운 공부 되세요! 🍵
