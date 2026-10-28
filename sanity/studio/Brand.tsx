import { Card, Flex, Text } from "@sanity/ui";
import type { LayoutProps, LogoProps, NavbarProps, ToolMenuProps } from "sanity";
import { ColorSchemeToggle } from "./ColorSchemeToggle";

// The real Two Seats mark, cropped from the logo (static/two-seats-mark.png,
// served by the Studio at /static/). A square crop of the green tile, so it
// works on light and dark backgrounds.
export function TwoSeatsMark({ size = 24 }: { size?: number }) {
  return <img src="/static/two-seats-mark.png" width={size} height={size} alt="" style={{ borderRadius: Math.round(size / 6), display: "block" }} />;
}

export function Logo({ title }: LogoProps) {
  return (
    <Flex align="center" gap={2}>
      <TwoSeatsMark size={24} />
      <Text className="two-seats-wordmark" weight="semibold" size={1} style={{ letterSpacing: "0.12em", textTransform: "uppercase" }}>
        {title}
      </Text>
    </Flex>
  );
}

// The top bar in Two Seats ink, in light and dark mode alike.
export function Navbar(props: NavbarProps) {
  return <Card scheme="dark">{props.renderDefault(props)}</Card>;
}

// The tool tabs (Home, Structure, Presentation…) plus the light/dark toggle.
export function ToolMenu(props: ToolMenuProps) {
  if (props.context !== "topbar") return props.renderDefault(props);
  return (
    <Flex align="center" gap={3}>
      {props.renderDefault(props)}
      <ColorSchemeToggle />
    </Flex>
  );
}

// Loads Montserrat for the Studio (the website self-hosts it via next/font).
export function Layout(props: LayoutProps) {
  return (
    <>
      <style>{`@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap");
      [data-ui="Navbar"] [data-ui="Text"], .two-seats-wordmark { font-family: "Montserrat", "Helvetica Neue", Arial, sans-serif; }`}</style>
      {props.renderDefault(props)}
    </>
  );
}
