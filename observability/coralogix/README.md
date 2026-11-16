# Coralogix dashboards and alerts for two-seats

Build these in Coralogix (https://tech.app.cx498.coralogix.com) once data is arriving. Then export each dashboard as JSON (Dashboard → ⋯ → Export) into this folder, e.g. `server-health.json`, so they're versioned with the code.

Everything is filtered to **application `two-seats`**. The subsystem is `web-preview` or `web-development`, and server spans carry `service.name = two-seats`.

## 1. Visitor experience (RUM)
Source: RUM, application `two-seats`.

- Sessions over time, split by `environment` label
- LCP, INP and CLS at p75, by page (view name)
- JS errors over time, plus a top-errors table
- Browser and device split
- `cta_click` logs counted by `cta_kind` label (email / phone / internal / external / button)
- `contact_submit` count
- `hero_intro_ms` custom measurement at p50/p95

## 2. Server health (APM / spans)
Source: spans, `service.name = two-seats`.

- Requests per minute by route (root spans, `http.route`)
- p50 / p95 duration by route
- Error rate: spans with status ERROR ÷ all root spans
- Slowest spans table (name, duration, trace link)
- Logs by severity (logs, subsystem `web-*`)

## 3. Sanity content
Source: spans whose name starts with `sanity.query`.

- Query duration p50/p95 by `sanity.query.name`
- Count with `sanity.fallback = true` (Sanity didn't answer, so the fallback copy was shown)
- Draft vs published: count by `sanity.draft_mode`
- Errors: `sanity.error = true`, plus logs "Sanity fetch failed"

## 4. Deploys
- The p95 duration, error-rate and LCP widgets above, grouped by RUM `version` (short commit SHA), to compare preview builds.

## Alerts (test)
Send all of these to Damian's email.

| Alert | Condition |
|---|---|
| Server error rate | errored root spans over 5% of requests for 5 min |
| Slow pages/API | p95 root-span duration over 1500 ms for 5 min |
| JS error spike | more than 5 RUM errors in 5 min |
| Sanity fallback | any span with `sanity.fallback = true` in 10 min |

To trigger them, run `npm run traffic -- <preview-url> 40`. The script's mix includes `/api/debug?kind=error` and `slow&ms=2200`.
