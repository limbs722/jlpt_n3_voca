import nextPWA from 'next-pwa';

const withPWA = nextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(?:gstatic|googleapis)\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts',
        expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
      },
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        expiration: { maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 30 },
      },
    },
    {
      urlPattern: /\/api\/.*$/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        networkTimeoutSeconds: 8,
        expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 },
      },
    },
  ],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // NOTE: compiler.emotion is intentionally disabled.
  // Enabling it flips the JSX runtime to @emotion/react/jsx-dev-runtime for
  // css-prop support, and that runtime calls React.createContext at module
  // top-level — which breaks Next.js App Router Server Components.
  // We only use @emotion/styled in this project, so we don't need the SWC
  // emotion plugin. If you ever want the `css={...}` prop, re-enable this
  // flag AND add "use client" + /** @jsxImportSource @emotion/react */ to
  // every file that uses the prop.
};

export default withPWA(nextConfig);
