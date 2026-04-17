"use client";

import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing(4)};
`;

export const Stack = styled.div<{ gap?: number }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme, gap = 3 }) => theme.spacing(gap)};
`;

export const Row = styled.div<{ gap?: number; align?: string; justify?: string }>`
  display: flex;
  align-items: ${({ align = "center" }) => align};
  justify-content: ${({ justify = "flex-start" }) => justify};
  gap: ${({ theme, gap = 2 }) => theme.spacing(gap)};
`;
