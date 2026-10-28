"use client";

import { useIsPresentationTool } from "next-sanity/hooks";

// A small "Exit preview" button for anyone viewing drafts outside the Studio
// (inside the Presentation tool the Studio has its own controls).
export function DisableDraftMode() {
  const isPresentationTool = useIsPresentationTool();
  if (isPresentationTool !== false) return null;
  return (
    <a
      href="/api/draft-mode/disable"
      className="fixed right-4 bottom-4 z-50 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white shadow-lg ring-2 ring-emerald"
    >
      Previewing drafts · Exit
    </a>
  );
}
