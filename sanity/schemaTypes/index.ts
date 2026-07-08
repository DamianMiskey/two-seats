import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { homepageType } from "./homepageType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, homepageType],
};
