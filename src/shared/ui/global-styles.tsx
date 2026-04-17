"use client";

import { Global, css } from "@emotion/react";

export const GlobalStyles = () => (
  <Global
    styles={(theme) => css`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }
      html,
      body {
        margin: 0;
        padding: 0;
        background: ${theme.colors.bg};
        color: ${theme.colors.text};
        font-family: ${theme.fonts.base};
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        overscroll-behavior-y: none;
      }
      body {
        min-height: 100dvh;
      }
      button {
        font-family: inherit;
        cursor: pointer;
      }
      a {
        color: inherit;
        text-decoration: none;
      }
      input,
      select,
      textarea {
        font-family: inherit;
      }
      :focus-visible {
        outline: 2px solid ${theme.colors.accent};
        outline-offset: 2px;
        border-radius: 4px;
      }
      ::selection {
        background: ${theme.colors.primary};
        color: #fff;
      }
    `}
  />
);
