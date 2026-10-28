/**
 * Lets you run `npx sanity …` in this folder (dev, deploy, typegen, exec).
 * Docs: https://www.sanity.io/docs/cli
 */
import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
  // The hosted Studio's address: https://twoseats.sanity.studio
  studioHost: "twoseats",
  // Studio updates itself to new Sanity releases without a redeploy.
  deployment: { autoUpdates: true },
  // TypeGen: generates TypeScript types from the schema and every
  // defineQuery() in the code, so a renamed field breaks the build, not the site.
  typegen: {
    path: "./{app,components,lib,sanity}/**/*.{ts,tsx}",
    schema: "./sanity/extract.json",
    generates: "./sanity.types.ts",
  },
});
