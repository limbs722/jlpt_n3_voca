'use client';

import { useEffect } from 'react';

import { createPortal } from 'react-dom';

import { useSignInWithGoogle } from '@/entities/auth/api';

import { Card, CloseBtn, Desc, GoogleBtn, IconWrap, LaterBtn, Overlay, Title } from './LoginPromptModal.style';

interface Props {
  /** 모달에 표시할 기능 설명 (기본값: 일반 메시지) */
  description?: string;
  onClose: () => void;
}

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

export const LoginPromptModal = ({
  description = '학습 기록과 즐겨찾기를 저장하려면 로그인이 필요해요.',
  onClose,
}: Props) => {
  const signInWithGoogle = useSignInWithGoogle();

  // ESC 키로 닫기
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // 스크롤 잠금
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <Overlay onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-label="로그인 안내">
      <Card>
        <CloseBtn onClick={onClose} aria-label="닫기">
          ×
        </CloseBtn>
        <IconWrap>🔐</IconWrap>
        <Title>로그인이 필요해요</Title>
        <Desc>{description}</Desc>
        <GoogleBtn onClick={signInWithGoogle}>
          <GoogleIcon />
          Google로 로그인
        </GoogleBtn>
        <LaterBtn onClick={onClose}>나중에 하기</LaterBtn>
      </Card>
    </Overlay>,
    document.body,
  );
};
