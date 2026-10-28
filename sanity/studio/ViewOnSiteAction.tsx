import { LaunchIcon } from "@sanity/icons/Launch";
import type { DocumentActionComponent } from "sanity";
import { pathFor, SITE_URL } from "./paths";

// A "View on site" button in each document's action menu, opening the page
// that shows it on the live website.
export const ViewOnSiteAction: DocumentActionComponent = (props) => {
  const doc = (props.published ?? props.draft) as { slug?: { current?: string } } | null;
  const path = pathFor(props.type, doc?.slug?.current);
  if (!path) return null;
  return {
    label: "View on site",
    icon: LaunchIcon,
    title: props.published ? `Open ${SITE_URL}${path}` : "Publish first: the site only shows published content",
    disabled: !props.published,
    onHandle: () => {
      window.open(`${SITE_URL}${path}`, "_blank", "noopener,noreferrer");
      props.onComplete();
    },
  };
};
