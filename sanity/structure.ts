import { CaseIcon } from "@sanity/icons/Case";
import { CogIcon } from "@sanity/icons/Cog";
import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { HeartIcon } from "@sanity/icons/Heart";
import { HomeIcon } from "@sanity/icons/Home";
import { UserIcon } from "@sanity/icons/User";
import { UsersIcon } from "@sanity/icons/Users";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import type { StructureResolver } from "sanity/structure";

// The Studio's sidebar. Pages and settings are singletons: one fixed document
// each (its ID is the type name), opened directly instead of from a list.
const singleton = (S: Parameters<StructureResolver>[0], type: string, title: string, icon: typeof HomeIcon) =>
  S.listItem().title(title).id(type).icon(icon).child(S.document().schemaType(type).documentId(type).title(title));

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Two Seats")
    .items([
      S.listItem()
        .title("Pages")
        .icon(HomeIcon)
        .child(
          S.list()
            .title("Pages")
            .items([
              singleton(S, "homePage", "Home", HomeIcon),
              singleton(S, "servicesPage", "Services", CaseIcon),
              singleton(S, "aboutPage", "About", UsersIcon),
              singleton(S, "contactPage", "Contact", EnvelopeIcon),
            ]),
        ),
      S.divider(),
      // Drag-and-drop lists: the order here is the order on the website.
      orderableDocumentListDeskItem({ type: "service", title: "Services", icon: CaseIcon, S, context }),
      orderableDocumentListDeskItem({ type: "carePlan", title: "Care plans", icon: HeartIcon, S, context }),
      S.documentTypeListItem("person").title("Team").icon(UserIcon),
      S.divider(),
      singleton(S, "siteSettings", "Site settings", CogIcon),
    ]);
