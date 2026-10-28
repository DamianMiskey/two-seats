import { CaseIcon } from "@sanity/icons/Case";
import { CogIcon } from "@sanity/icons/Cog";
import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { HeartIcon } from "@sanity/icons/Heart";
import { HomeIcon } from "@sanity/icons/Home";
import { UserIcon } from "@sanity/icons/User";
import { UsersIcon } from "@sanity/icons/Users";
import type { StructureResolver } from "sanity/structure";

// The Studio's sidebar. Pages and settings are singletons: one fixed document
// each (its ID is the type name), opened directly instead of from a list.
const singleton = (S: Parameters<StructureResolver>[0], type: string, title: string, icon: typeof HomeIcon) =>
  S.listItem().title(title).id(type).icon(icon).child(S.document().schemaType(type).documentId(type).title(title));

export const structure: StructureResolver = (S) =>
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
      S.documentTypeListItem("service").title("Services").icon(CaseIcon),
      S.documentTypeListItem("carePlan").title("Care plans").icon(HeartIcon),
      S.documentTypeListItem("person").title("Team").icon(UserIcon),
      S.divider(),
      singleton(S, "siteSettings", "Site settings", CogIcon),
    ]);
