export interface AppTheme {
  colors: {
    bg: string;
    bgElevated: string;
    surface: string;
    border: string;
    text: string;
    textMuted: string;
    textSubtle: string;
    primary: string;
    primaryHover: string;
    accent: string;
    success: string;
    warning: string;
    danger: string;
    overlay: string;
  };
  radii: {
    sm: string;
    md: string;
    lg: string;
    pill: string;
  };
  spacing: (n: number) => string;
  fonts: {
    base: string;
    jp: string;
    serif: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  zIndex: {
    nav: number;
    modal: number;
    toast: number;
  };
}

export const theme: AppTheme = {
  colors: {
    bg: "#FAFAF7",
    bgElevated: "#FFFFFF",
    surface: "#F3F2EE",
    border: "#E6E4DE",
    text: "#1B1B1B",
    textMuted: "#6B6B6B",
    textSubtle: "#9A9A9A",
    primary: "#D93A3A", // 빨간색 — 일본 단어장 느낌 살짝
    primaryHover: "#B82F2F",
    accent: "#2563EB",
    success: "#15803D",
    warning: "#B45309",
    danger: "#DC2626",
    overlay: "rgba(0,0,0,0.45)",
  },
  radii: {
    sm: "6px",
    md: "10px",
    lg: "16px",
    pill: "9999px",
  },
  spacing: (n: number) => `${n * 4}px`,
  fonts: {
    base: `-apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", "Noto Sans JP", sans-serif`,
    jp: `"Noto Sans JP", "Hiragino Sans", "ヒラギノ角ゴシック", sans-serif`,
    serif: `"Noto Serif JP", ui-serif, serif`,
  },
  shadows: {
    sm: "0 1px 2px rgba(0,0,0,0.04)",
    md: "0 4px 16px rgba(0,0,0,0.06)",
    lg: "0 10px 32px rgba(0,0,0,0.08)",
  },
  breakpoints: {
    mobile: "480px",
    tablet: "768px",
    desktop: "1024px",
  },
  zIndex: {
    nav: 40,
    modal: 60,
    toast: 80,
  },
};

declare module "@emotion/react" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends AppTheme {}
}
