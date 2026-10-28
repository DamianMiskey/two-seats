import type { StringRule } from "sanity";

// Links editors can type are limited to safe schemes, so a "javascript:" link
// (or anything else unexpected) can never be published, even from a
// compromised editor account. Internal paths ("/services") and on-page
// anchors ("#contact") are allowed too.
const SAFE_LINK = /^(https:\/\/|mailto:|tel:|\/(?!\/)|#)/i;

export const safeLink = (rule: StringRule) =>
  rule.custom((value) => {
    if (value === undefined || value === "") return true;
    return SAFE_LINK.test(value.trim())
      ? true
      : "Use https://…, mailto:…, tel:…, a page path like /services, or an anchor like #contact.";
  });
