// Where telemetry goes, and whether it's on. Shared by instrumentation.ts
// (server), next.config.ts (CSP) and the root layout (browser RUM).
//
// Telemetry is OFF in production on purpose: this is a test Coralogix
// account, and twoseats.co.za's real visitors shouldn't end up in it.
// It runs on preview deployments and local dev, and only once the keys are set.

const isProduction = () => process.env.VERCEL_ENV === "production";

/** Server traces and logs over OTLP/HTTP, or null when switched off. */
export function serverTelemetry() {
  const key = process.env.CX_SEND_KEY;
  const domain = process.env.CX_DOMAIN; // e.g. cx498.coralogix.com (US2)
  if (!key || !domain || isProduction()) return null;
  const env = process.env.VERCEL_ENV ?? "local";
  return {
    endpoint: process.env.CX_OTLP_ENDPOINT ?? `https://ingress.${domain}`,
    environment: env,
    headers: {
      Authorization: `Bearer ${key}`,
      "CX-Application-Name": "two-seats",
      "CX-Subsystem-Name": `web-${env}`,
    },
  };
}

// The browser SDK's ingress host for each Coralogix region
// (from @coralogix/browser's CoralogixDomainsApiUrlMap).
const RUM_INGRESS = {
  EU1: "https://ingress.eu1.rum-ingress-coralogix.com",
  EU2: "https://ingress.eu2.rum-ingress-coralogix.com",
  US1: "https://ingress.us1.rum-ingress-coralogix.com",
  US2: "https://ingress.us2.rum-ingress-coralogix.com",
  US3: "https://ingress.us3.rum-ingress-coralogix.com",
  AP1: "https://ingress.ap1.rum-ingress-coralogix.com",
  AP2: "https://ingress.ap2.rum-ingress-coralogix.com",
  AP3: "https://ingress.ap3.rum-ingress-coralogix.com",
} as const;
export type RumDomain = keyof typeof RUM_INGRESS;

/** Browser RUM settings, or null when switched off. */
export function rumTelemetry() {
  const publicKey = process.env.NEXT_PUBLIC_CX_RUM_KEY;
  const domain = (process.env.NEXT_PUBLIC_CX_RUM_DOMAIN ?? "US2") as RumDomain;
  if (!publicKey || !(domain in RUM_INGRESS) || isProduction()) return null;
  return {
    publicKey,
    domain,
    ingress: RUM_INGRESS[domain],
    environment: process.env.VERCEL_ENV ?? "local",
    version: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "local",
  };
}
