import { draftMode } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

// Leaves draft mode and returns to the published site.
export async function GET(request: NextRequest) {
  (await draftMode()).disable();
  return NextResponse.redirect(new URL("/", request.url));
}
