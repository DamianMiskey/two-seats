#!/usr/bin/env node
// Sends test traffic to a two-seats deployment, so the Coralogix dashboards
// and alerts have something to show. Server traffic only (no browser, so no
// RUM data: for that, click around the preview in a real browser).
//
//   node scripts/traffic.mjs <base-url> [rounds=20]
//   npm run traffic -- https://two-seats-git-coralogix-observability-two-seats.vercel.app 30
//
// Preview deployments behind Vercel Deployment Protection need a bypass
// secret: VERCEL_BYPASS=<secret> node scripts/traffic.mjs ...
// (Project → Settings → Deployment Protection → Protection Bypass for Automation.)

const [base, roundsArg] = process.argv.slice(2);
if (!base) {
  console.error("Usage: node scripts/traffic.mjs <base-url> [rounds]");
  process.exit(1);
}
if (/twoseats\.co\.za/.test(base)) {
  console.error("Refusing to send test traffic to the production site.");
  process.exit(1);
}

const rounds = Number(roundsArg) || 20;
const headers = process.env.VERCEL_BYPASS ? { "x-vercel-protection-bypass": process.env.VERCEL_BYPASS } : {};

// Mostly normal page views, with some slow requests, errors and Sanity queries.
const paths = [
  ...Array(6).fill("/"),
  "/services", "/services", "/about", "/contact",
  "/api/debug?kind=ok",
  "/api/debug?kind=sanity",
  "/api/debug?kind=log",
  "/api/debug?kind=slow&ms=900",
  "/api/debug?kind=slow&ms=2200",
  "/api/debug?kind=error",
];

const counts = {};
for (let round = 1; round <= rounds; round++) {
  const batch = Array.from({ length: 4 }, () => paths[Math.floor(Math.random() * paths.length)]);
  await Promise.all(
    batch.map(async (path) => {
      const started = performance.now();
      try {
        const res = await fetch(new URL(path, base), { headers, redirect: "manual" });
        await res.arrayBuffer();
        const key = `${res.status} ${path.split("&")[0]}`;
        counts[key] = (counts[key] ?? 0) + 1;
        process.stdout.write(`\r${round}/${rounds}  ${res.status}  ${Math.round(performance.now() - started)}ms  ${path}`.padEnd(80));
      } catch {
        counts[`failed ${path}`] = (counts[`failed ${path}`] ?? 0) + 1;
      }
    }),
  );
  await new Promise((r) => setTimeout(r, 300 + Math.random() * 700));
}

console.log("\n\nResponses:");
for (const [key, n] of Object.entries(counts).sort()) console.log(`  ${String(n).padStart(4)}  ${key}`);
if (Object.keys(counts).some((k) => k.startsWith("401") || k.startsWith("302"))) {
  console.log("\nGot 401/302: the preview is protected. Set VERCEL_BYPASS (see the top of this file).");
}
