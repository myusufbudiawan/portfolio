import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";
export const ogAlt =
  "Muhammad Yusuf Budiawan, backend and full-stack engineer at Dell Technologies";

/**
 * Social card. Rendered at build time from the same palette as the site, so
 * there is no binary asset to keep in sync with the design.
 */
export function renderOg() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#f4f6f8",
          backgroundImage:
            "radial-gradient(760px 620px at 12% -10%, rgba(255,196,140,0.85), transparent 62%), radial-gradient(720px 560px at 100% 30%, rgba(150,214,222,0.8), transparent 64%), radial-gradient(680px 520px at 60% 118%, rgba(186,214,168,0.7), transparent 66%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 22,
            letterSpacing: 2.4,
            textTransform: "uppercase",
            color: "#4a5058",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              backgroundColor: "#b4622f",
            }}
          />
          Backend &amp; full-stack engineer
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              fontSize: 82,
              lineHeight: 1.02,
              letterSpacing: -3.4,
              fontWeight: 600,
              color: "#16181d",
              maxWidth: 900,
            }}
          >
            Marketplace platforms, APIs, and the LLM tooling that configures
            them.
          </div>
          <div style={{ fontSize: 32, color: "#3d434b" }}>
            Muhammad Yusuf Budiawan
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 24,
            color: "#4a5058",
          }}
        >
          <div>Software Engineer 2 · Dell Technologies</div>
          <div>Kuala Lumpur, Malaysia</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
