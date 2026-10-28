import { createImageUrlBuilder } from "@sanity/image-url";
import { Box, Card, Flex, Grid, Label, Stack, Text } from "@sanity/ui";
import { type ObjectInputProps, useClient, useFormValue } from "sanity";
import { pathFor, SITE_URL } from "./paths";

type Seo = { title?: string; description?: string; image?: { asset?: { _ref?: string } } };
const clip = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s);

// The normal SEO fields, plus live previews of how the page will look in
// Google results and as a link shared on WhatsApp, as you type.
export function SeoInput(props: ObjectInputProps) {
  const value = (props.value ?? {}) as Seo;
  const client = useClient({ apiVersion: "2026-10-01" });
  const type = useFormValue(["_type"]) as string | undefined;
  const slug = useFormValue(["slug", "current"]) as string | undefined;
  // Hooks always run in the same order, so read both and pick afterwards.
  const ownTitle = useFormValue(["title"]) as string | undefined;
  const heroTitle = useFormValue(["hero", "title"]) as string | undefined;
  const docTitle = ownTitle ?? heroTitle;

  const path = pathFor(type, slug) ?? "/";
  const host = SITE_URL.replace(/^https?:\/\//, "");
  const title = value.title || (docTitle ? `${docTitle} | Two Seats` : "Two Seats | Website Audits, Care & Cybersecurity");
  const description = value.description || "Add a description so Google shows your words instead of guessing.";
  const image = value.image?.asset?._ref ? createImageUrlBuilder(client).image(value.image).width(600).height(315).fit("crop").url() : null;

  return (
    <Stack gap={4}>
      {props.renderDefault(props)}
      <Grid gridTemplateColumns={[1, 1, 2]} gap={3}>
        <Stack gap={2}>
          <Label size={1} muted>Google preview</Label>
          <Card padding={3} radius={3} border tone="default">
            <Stack gap={2}>
              <Text size={1} muted>{host} › {path.replace(/^\//, "").replace("#", " › ") || "home"}</Text>
              <Text size={2} weight="medium" style={{ color: "#1a0dab" }}>{clip(title, 60)}</Text>
              <Text size={1} muted>{clip(description, 160)}</Text>
            </Stack>
          </Card>
          <Text size={0} muted>Title {title.length}/60 · Description {value.description?.length ?? 0}/160</Text>
        </Stack>
        <Stack gap={2}>
          <Label size={1} muted>WhatsApp / LinkedIn preview</Label>
          <Card radius={3} border overflow="hidden" tone="default">
            {image ? (
              <img src={image} alt="" style={{ display: "block", width: "100%", aspectRatio: "1200 / 630", objectFit: "cover" }} />
            ) : (
              <Flex align="center" justify="center" style={{ aspectRatio: "1200 / 630", background: "linear-gradient(135deg,#47b175,#1d1d1b 55%,#006f8d)" }}>
                <Text size={1} style={{ color: "#fff" }}>Add a share image (1200 × 630)</Text>
              </Flex>
            )}
            <Box padding={3}>
              <Stack gap={2}>
                <Text size={1} weight="semibold">{clip(title, 70)}</Text>
                <Text size={1} muted>{clip(description, 100)}</Text>
                <Text size={0} muted>{host}</Text>
              </Stack>
            </Box>
          </Card>
        </Stack>
      </Grid>
    </Stack>
  );
}
