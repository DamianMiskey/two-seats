import { buildLegacyTheme } from "sanity";

// The Studio in Two Seats colours (from the Two Seats Style Guide): ink and
// white, emerald as the main accent, blue for depth, coral only for danger.
const brand = {
  ink: "#1d1d1b",
  white: "#ffffff",
  emerald: "#47b175",
  emeraldDark: "#2f8a57",
  blue: "#006f8d",
  cyan: "#25b9d3",
  coral: "#e84135",
  grey: "#c6c6c6",
};

export const twoSeatsTheme = buildLegacyTheme({
  "--font-family-base": '"Montserrat", "Helvetica Neue", Arial, sans-serif',
  "--font-family-monospace": 'ui-monospace, SFMono-Regular, Menlo, monospace',
  "--black": brand.ink,
  "--white": brand.white,
  "--gray": "#6b6b67",
  "--gray-base": "#6b6b67",
  "--component-bg": brand.white,
  "--component-text-color": brand.ink,
  "--brand-primary": brand.emeraldDark,
  // Buttons and states
  "--default-button-color": "#6b6b67",
  "--default-button-primary-color": brand.emeraldDark,
  "--default-button-success-color": brand.emeraldDark,
  "--default-button-warning-color": "#c98a00",
  "--default-button-danger-color": brand.coral,
  "--state-info-color": brand.blue,
  "--state-success-color": brand.emeraldDark,
  "--state-warning-color": "#c98a00",
  "--state-danger-color": brand.coral,
  "--focus-color": brand.cyan,
  // The top bar, in ink
  "--main-navigation-color": brand.ink,
  "--main-navigation-color--inverted": brand.white,
});
