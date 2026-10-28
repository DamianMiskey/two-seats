/**
 * Sanity Studio configuration. The Studio is hosted by Sanity
 * (`npm run studio:deploy` → https://twoseats.sanity.studio) and runs locally
 * with `npm run studio`; it is no longer part of the website.
 */
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { resolve } from "./sanity/presentation";
import { schema, SINGLETON_TYPES } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import { Layout, Logo, TwoSeatsMark } from "./sanity/studio/Brand";
import { twoSeatsTheme } from "./sanity/studio/theme";

// Where the Presentation tool loads the site from. Set
// SANITY_STUDIO_PREVIEW_ORIGIN to the live or preview address when deploying.
const previewOrigin = process.env.SANITY_STUDIO_PREVIEW_ORIGIN || "http://localhost:3000";

export default defineConfig({
  name: "two-seats",
  title: "Two Seats",
  // Brand colours, font and logo (see sanity/studio/).
  theme: twoSeatsTheme,
  icon: () => <TwoSeatsMark size={26} />,
  studio: { components: { logo: Logo, layout: Layout } },
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    // Click-to-edit on a live preview of the site, using draft mode.
    presentationTool({
      resolve,
      previewUrl: { origin: previewOrigin, previewMode: { enable: "/api/draft-mode/enable" } },
    }),
    // GROQ playground, for trying queries. Shown to administrators only.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  // Only administrators see Vision; editors get Structure and Presentation.
  tools: (tools, { currentUser }) =>
    currentUser?.roles.some((r) => r.name === "administrator") ? tools : tools.filter((t) => t.name !== "vision"),
  schema: {
    types: schema.types,
    // Singletons can't be created from the "new document" menu…
    templates: (templates) => templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },
  document: {
    // …nor duplicated or deleted.
    actions: (actions, { schemaType }) =>
      SINGLETON_TYPES.has(schemaType)
        ? actions.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action))
        : actions,
    newDocumentOptions: (items) => items.filter((item) => !SINGLETON_TYPES.has(item.templateId)),
  },
});
