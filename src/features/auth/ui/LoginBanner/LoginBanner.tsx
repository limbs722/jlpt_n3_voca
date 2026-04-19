'use client';

import { useState } from 'react';

import { useAuth, useSignInWithGoogle } from '@/entities/auth/api';
import { isSupabaseConfigured } from '@/shared/config/env';

import { Banner, BannerIcon, BannerText, DismissBtn, LoginLink } from './LoginBanner.style';

interface Props {
  /** 배너에 표시할 메시지 */
  message?: string;
}

export const LoginBanner = ({ message = '로그인하면 학습 기록이 기기 간에 저장돼요.' }: Props) => {
  const { isLoggedIn, isLoading } = useAuth();
  const signInWithGoogle = useSignInWithGoogle();
  const [dismissed, setDismissed] = useState(false);

  // Supabase 미설정 시 로그인 기능 자체가 없으므로 배너 미표시
  if (!isSupabaseConfigured) return null;
  if (isLoading || isLoggedIn || dismissed) return null;

  return (
    <Banner role="note">
      <BannerIcon>💡</BannerIcon>
      <BannerText>
        <strong>로그인</strong>하면 {message}
      </BannerText>
      <LoginLink onClick={signInWithGoogle}>로그인</LoginLink>
      <DismissBtn onClick={() => setDismissed(true)} aria-label="배너 닫기">
        ×
      </DismissBtn>
    </Banner>
  );
};
