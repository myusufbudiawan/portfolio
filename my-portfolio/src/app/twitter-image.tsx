import { ogAlt, ogContentType, ogSize, renderOg } from "@/lib/og";

// Rendered once at build time; an export has no server to render it later.
export const dynamic = "force-static";

export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg();
}
