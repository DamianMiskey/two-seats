"use client";

import { useEffect } from "react";
import type { RumDomain } from "@/lib/telemetry-config";

// Coralogix browser RUM: page views, Web Vitals, JS errors, slow tasks and
// clicks. Rendered by the root layout only when RUM is switched on (preview
// and local, never production). The SDK is loaded on demand so it adds
// nothing to the page's first download.
//
// Privacy: no session recording, no IP collection, and the custom events
// below never include anything typed into the contact form.

type Props = { publicKey: string; domain: RumDomain; environment: string; version: string };

export function Observability({ publicKey, domain, environment, version }: Props) {
  useEffect(() => {
    let cleanup = () => {};
    let cancelled = false;

    import("@coralogix/browser").then(({ CoralogixRum }) => {
      if (cancelled) return;
      if (!CoralogixRum.isInited) {
        CoralogixRum.init({
          public_key: publicKey,
          application: "two-seats",
          coralogixDomain: domain,
          version,
          environment,
          labels: { site: "two-seats", environment },
          collectIPData: false,
          trackSoftNavigations: true,
          // Adds a traceparent header to same-origin requests, so a browser
          // request and the server trace it caused join up in Coralogix.
          traceParentInHeader: { enabled: true },
          instrumentations: { errors: true, fetch: true, xhr: true, custom: true, long_tasks: true, resources: true, interactions: true, web_vitals: true },
        });
      }

      // Call-to-action clicks: which button or link, and what kind.
      const onClick = (event: MouseEvent) => {
        const el = (event.target as Element | null)?.closest("a, button");
        if (!el) return;
        const href = el.getAttribute("href") ?? "";
        const kind = href.startsWith("mailto:") ? "email" : href.startsWith("tel:") ? "phone" : href.startsWith("http") && !href.startsWith(location.origin) ? "external" : el.tagName === "BUTTON" ? "button" : "internal";
        const label = (el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 60);
        CoralogixRum.info("cta_click", { label, kind, href: kind === "internal" ? href : kind, page: location.pathname }, { event: "cta_click", cta_kind: kind });
      };
      // Contact form sent: only the number of interests ticked, never the contents.
      const onSubmit = (event: SubmitEvent) => {
        const form = event.target as HTMLFormElement;
        const interests = form.querySelectorAll('input[type="checkbox"]:checked').length;
        CoralogixRum.info("contact_submit", { interests, page: location.pathname }, { event: "contact_submit" });
      };
      // The home hero's GSAP intro finished (dispatched by components/hero/Hero.tsx).
      const onIntro = (event: Event) => {
        const ms = (event as CustomEvent<{ ms: number }>).detail?.ms;
        if (typeof ms === "number") CoralogixRum.sendCustomMeasurement("hero_intro_ms", ms);
      };

      document.addEventListener("click", onClick, { capture: true });
      document.addEventListener("submit", onSubmit, { capture: true });
      window.addEventListener("twoseats:intro-done", onIntro);
      cleanup = () => {
        document.removeEventListener("click", onClick, { capture: true });
        document.removeEventListener("submit", onSubmit, { capture: true });
        window.removeEventListener("twoseats:intro-done", onIntro);
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [publicKey, domain, environment, version]);

  return null;
}
