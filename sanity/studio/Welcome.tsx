import { AddIcon } from "@sanity/icons/Add";
import { CheckmarkCircleIcon } from "@sanity/icons/CheckmarkCircle";
import { ClockIcon } from "@sanity/icons/Clock";
import { EditIcon } from "@sanity/icons/Edit";
import { HomeIcon } from "@sanity/icons/Home";
import { LaunchIcon } from "@sanity/icons/Launch";
import { Badge, Box, Button, Card, Container, Flex, Grid, Heading, Stack, Text } from "@sanity/ui";
import { useEffect, useState } from "react";
import { useClient, useCurrentUser, type Tool } from "sanity";
import { IntentLink } from "sanity/router";
import { TwoSeatsMark } from "./Brand";
import { SITE_URL } from "./paths";

type Recent = { _id: string; _type: string; label?: string; _updatedAt: string };
type Health = { services: number; plans: number; plansNoPrice: number; people: number; peopleNoPhoto: number; pagesNoSeo: number };

const TYPE_NAMES: Record<string, string> = {
  homePage: "Home page", aboutPage: "About page", servicesPage: "Services page", contactPage: "Contact page",
  siteSettings: "Site settings", service: "Service", carePlan: "Care plan", person: "Team member",
};

const QUICK = [
  { label: "Edit the home page", intent: "edit" as const, params: { id: "homePage", type: "homePage" }, icon: HomeIcon },
  { label: "Edit a service", intent: "edit" as const, params: { id: "service-website-audit", type: "service" }, icon: EditIcon },
  { label: "Update care plan prices", intent: "edit" as const, params: { id: "carePlan-growth", type: "carePlan" }, icon: EditIcon },
  { label: "Add a team member", intent: "create" as const, params: { type: "person" }, icon: AddIcon },
  { label: "Site settings", intent: "edit" as const, params: { id: "siteSettings", type: "siteSettings" }, icon: EditIcon },
];

const ago = (iso: string) => {
  const m = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} h ago`;
  return `${Math.round(h / 24)} d ago`;
};

function Welcome() {
  const user = useCurrentUser();
  const client = useClient({ apiVersion: "2026-10-01" });
  const [recent, setRecent] = useState<Recent[] | null>(null);
  const [health, setHealth] = useState<Health | null>(null);

  useEffect(() => {
    let live = true;
    client
      .fetch<Recent[]>(`*[_type in $types] | order(_updatedAt desc)[0...6]{ _id, _type, _updatedAt, "label": coalesce(title, name, hero.title) }`, { types: Object.keys(TYPE_NAMES) })
      .then((r) => live && setRecent(r));
    client
      .fetch<Health>(`{
        "services": count(*[_type == "service" && !(_id in path("drafts.**"))]),
        "plans": count(*[_type == "carePlan" && !(_id in path("drafts.**"))]),
        "plansNoPrice": count(*[_type == "carePlan" && !(_id in path("drafts.**")) && !defined(priceFrom)]),
        "people": count(*[_type == "person" && !(_id in path("drafts.**"))]),
        "peopleNoPhoto": count(*[_type == "person" && !(_id in path("drafts.**")) && !defined(photo.asset)]),
        "pagesNoSeo": count(*[_id in ["homePage","aboutPage","servicesPage","contactPage"] && !defined(seo.description)])
      }`)
      .then((h) => live && setHealth(h));
    return () => { live = false; };
  }, [client]);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const firstName = user?.name?.split(" ")[0];

  const todo = health
    ? [
        health.people === 0 && "Add yourselves as team members (shows \"The two seats\" on the About page)",
        health.peopleNoPhoto > 0 && `${health.peopleNoPhoto} team member${health.peopleNoPhoto > 1 ? "s" : ""} without a photo`,
        health.plansNoPrice > 0 && `${health.plansNoPrice} care plan${health.plansNoPrice > 1 ? "s" : ""} showing "Price on request"`,
        health.pagesNoSeo > 0 && `${health.pagesNoSeo} page${health.pagesNoSeo > 1 ? "s" : ""} without a Google description`,
      ].filter(Boolean)
    : [];

  return (
    <Box padding={[4, 5, 6]} style={{ overflow: "auto", height: "100%" }}>
      <Container width={3}>
        <Stack gap={5}>
          <Flex align="center" gap={3}>
            <TwoSeatsMark size={44} />
            <Stack gap={2}>
              <Heading size={3}>{greeting}{firstName ? `, ${firstName}` : ""}</Heading>
              <Text muted>Connect | Create | Collaborate</Text>
            </Stack>
          </Flex>

          <Grid gridTemplateColumns={[1, 1, 2]} gap={4}>
            <Card padding={4} radius={4} border>
              <Stack gap={4}>
                <Heading size={1}>Quick actions</Heading>
                <Stack gap={2}>
                  {QUICK.map((q) => (
                    <Button key={q.label} as={IntentLink} intent={q.intent} params={q.params} icon={q.icon} text={q.label} mode="ghost" justify="flex-start" />
                  ))}
                </Stack>
              </Stack>
            </Card>

            <Card padding={4} radius={4} border>
              <Stack gap={4}>
                <Heading size={1}>Your website</Heading>
                <Stack gap={2}>
                  <Button as="a" href={SITE_URL} target="_blank" rel="noopener noreferrer" icon={LaunchIcon} text="Open the live site" tone="positive" justify="flex-start" />
                  <Button as="a" href="https://two-seats-git-sanity-content-two-seats.vercel.app" target="_blank" rel="noopener noreferrer" icon={LaunchIcon} text="Open the preview" mode="ghost" justify="flex-start" />
                </Stack>
                {health ? (
                  <Flex gap={2} wrap="wrap">
                    <Badge tone="primary">{health.services} services</Badge>
                    <Badge tone="primary">{health.plans} care plans</Badge>
                    <Badge tone="primary">{health.people} team members</Badge>
                  </Flex>
                ) : null}
              </Stack>
            </Card>

            <Card padding={4} radius={4} border tone={todo.length ? "caution" : "positive"}>
              <Stack gap={4}>
                <Heading size={1}>To finish</Heading>
                {!health ? (
                  <Text muted>Checking your content…</Text>
                ) : todo.length ? (
                  <Stack gap={3}>{todo.map((t) => <Text key={String(t)} size={1}>• {t}</Text>)}</Stack>
                ) : (
                  <Flex gap={2} align="center"><CheckmarkCircleIcon /><Text size={1}>Everything&apos;s filled in.</Text></Flex>
                )}
              </Stack>
            </Card>

            <Card padding={4} radius={4} border>
              <Stack gap={4}>
                <Heading size={1}>Recently edited</Heading>
                {!recent ? (
                  <Text muted>Loading…</Text>
                ) : recent.length ? (
                  <Stack gap={2}>
                    {recent.map((r) => (
                      <Button
                        key={r._id}
                        as={IntentLink}
                        intent="edit"
                        params={{ id: r._id.replace(/^drafts\./, ""), type: r._type }}
                        mode="bleed"
                        justify="flex-start"
                        icon={ClockIcon}
                        text={`${r.label ?? TYPE_NAMES[r._type]} · ${TYPE_NAMES[r._type]} · ${ago(r._updatedAt)}${r._id.startsWith("drafts.") ? " · draft" : ""}`}
                      />
                    ))}
                  </Stack>
                ) : (
                  <Text muted>No content yet. Run npm run seed to copy the website&apos;s copy in.</Text>
                )}
              </Stack>
            </Card>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}

// A "Home" tab in the Studio's top bar: the first thing editors see.
export const welcomeTool: Tool = {
  name: "welcome",
  title: "Home",
  icon: HomeIcon,
  component: Welcome,
};
