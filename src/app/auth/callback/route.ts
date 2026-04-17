import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/shared/lib/supabase/server';

/**
 * Google OAuth 콜백 핸들러.
 * Supabase가 `?code=…` 파라미터와 함께 이 URL로 리디렉트합니다.
 * code를 세션으로 교환한 뒤 홈으로 이동합니다.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // 로그인 후 돌아갈 페이지 (없으면 홈)
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = getSupabaseServerClient();
    if (supabase) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // 에러 시 홈으로 fallback
  return NextResponse.redirect(`${origin}/`);
}
