import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Sanity Studio (/studio) is a heavy client-side app that needs eval,
// websockets, and inline styles to run — it gets the baseline headers
// only. The CSP below applies to every other route.
//
// `upgrade-insecure-requests` and HSTS are both PRODUCTION-ONLY: the local
// dev server only speaks plain HTTP, so either of these sent in dev makes
// the browser force every request to https:// and fail. HSTS is worse than
// most bugs here because browsers (Safari especially) cache it for the
// `max-age` duration — once sent, the browser keeps forcing HTTPS for that
// host even after this header is removed, until the cached policy expires
// or is manually cleared.
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https://cdn.sanity.io;
  font-src 'self' data:;
  connect-src 'self' https://*.sanity.io https://vitals.vercel-insights.com https://va.vercel-scripts.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'self';
  ${isDev ? "" : "upgrade-insecure-requests;"}
`
  .replace(/\s{2,}/g, " ")
  .trim();

const baseSecurityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  ...(isDev
    ? []
    : [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]),
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: baseSecurityHeaders,
      },
      {
        source: "/((?!studio).*)",
        headers: [{ key: "Content-Security-Policy", value: cspHeader }],
      },
    ];
  },
};

export default nextConfig;
