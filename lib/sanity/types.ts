// Convenient names for the generated query result types.
import type {
  ABOUT_QUERY_RESULT,
  CARE_PLANS_QUERY_RESULT,
  HOME_QUERY_RESULT,
  SERVICES_QUERY_RESULT,
} from "@/sanity.types";

export type HomeContent = NonNullable<HOME_QUERY_RESULT>;
export type ServiceContent = NonNullable<SERVICES_QUERY_RESULT>[number];
export type CarePlanContent = NonNullable<CARE_PLANS_QUERY_RESULT>[number];
export type Founder = NonNullable<NonNullable<ABOUT_QUERY_RESULT>["founders"]>[number];
export type Heading = { eyebrow?: string | null; title?: string | null; subtitle?: string | null } | null | undefined;
