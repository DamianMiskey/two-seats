import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// The CSP below applies to every route. (Sanity Studio used to live at
// /studio with its own exemption; it's now hosted by Sanity instead.)
//
// `upgrade-insecure-requests` and HSTS are both PRODUCTION-ONLY: the local
// dev server only speaks plain HTTP, so either of these sent in dev makes
// the browser force every request to https:// and fail. HSTS is worse than
// most bugs here because browsers (Safari especially) cache it for the
// `max-age` duration — once sent, the browser keeps forcing HTTPS for that
// host even after this header is removed, until the cached policy expires
// or is manually cleared.
// Pages may only be framed by this site and the Two Seats Studio, whose
// Presentation tool shows the site in a frame for click-to-edit previews.
const frameAncestors = [
  "'self'",
  "https://twoseats.sanity.studio",
  ...(isDev ? ["http://localhost:3333"] : []),
].join(" ");

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
  frame-ancestors ${frameAncestors};
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
  // Team photos and other images uploaded to Sanity.
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" }],
  },
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
        source: "/:path*",
        headers: [{ key: "Content-Security-Policy", value: cspHeader }],
      },
    ];
  },
};

export default nextConfig;
