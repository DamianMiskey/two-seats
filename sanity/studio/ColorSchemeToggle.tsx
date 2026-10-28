import { DesktopIcon } from "@sanity/icons/Desktop";
import { MoonIcon } from "@sanity/icons/Moon";
import { SunIcon } from "@sanity/icons/Sun";
import { Box, Button, Inline, Text } from "@sanity/ui";
import { Tooltip } from "@sanity/ui/tooltip";
import { useColorSchemeInternalValue, useColorSchemeSetValue } from "sanity";

const OPTIONS = [
  { value: "system", label: "Match my device", icon: DesktopIcon },
  { value: "light", label: "Light", icon: SunIcon },
  { value: "dark", label: "Dark", icon: MoonIcon },
] as const;

// System / Light / Dark for the Studio, like the switch on the website.
// The choice is saved in this browser, so each editor picks their own.
export function ColorSchemeToggle() {
  const current = useColorSchemeInternalValue();
  const setScheme = useColorSchemeSetValue();
  if (!setScheme) return null;
  return (
    <Inline gap={1} role="group" aria-label="Studio appearance">
      {OPTIONS.map(({ value, label, icon }) => (
        <Tooltip key={value} content={<Box padding={2}><Text size={1}>{label}</Text></Box>} placement="bottom" portal>
          <Button
            icon={icon}
            mode={current === value ? "default" : "bleed"}
            tone={current === value ? "positive" : "default"}
            aria-label={label}
            aria-pressed={current === value}
            onClick={() => setScheme(value)}
            padding={2}
            fontSize={1}
          />
        </Tooltip>
      ))}
    </Inline>
  );
}
