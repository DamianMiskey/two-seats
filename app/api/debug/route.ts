import { log, withSpan } from "@/lib/observe";
import { getHome } from "@/lib/sanity/content";

// Test traffic for the Coralogix dashboards and alerts: makes errors, slow
// responses and Sanity queries on demand. Previews and local dev only; in
// production this route doesn't exist (404).
//
//   /api/debug?kind=ok | error | slow&ms=1200 | sanity | log
export async function GET(request: Request) {
  if (process.env.VERCEL_ENV === "production") return new Response("Not found", { status: 404 });

  const url = new URL(request.url);
  const kind = url.searchParams.get("kind") ?? "ok";

  return withSpan("debug.request", { "debug.kind": kind }, async () => {
    switch (kind) {
      case "ok":
        return Response.json({ ok: true });

      case "error": {
        const error = new Error("Debug error: deliberately thrown for testing");
        log("error", "Debug route threw on purpose", { "debug.kind": kind }, error);
        throw error; // a real 500, recorded on the span
      }

      case "slow": {
        const ms = Math.min(Math.max(Number(url.searchParams.get("ms")) || 1500, 0), 8000);
        await new Promise((resolve) => setTimeout(resolve, ms));
        log("warn", "Debug route answered slowly on purpose", { "debug.kind": kind, "debug.delay_ms": ms });
        return Response.json({ ok: true, delayed: ms });
      }

      case "sanity": {
        const home = await getHome();
        return Response.json({ ok: true, title: home.hero?.title ?? null });
      }

      case "log":
        log("info", "Debug log line", { "debug.kind": kind });
        return Response.json({ ok: true, logged: true });

      default:
        return Response.json({ ok: false, error: "kind must be ok, error, slow, sanity or log" }, { status: 400 });
    }
  });
}
