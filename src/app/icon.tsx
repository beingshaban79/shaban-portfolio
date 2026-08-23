import { ImageResponse } from "next/og";

/**
 * Favicon generated at build time — no binary asset to keep in sync with the
 * theme, and it uses the same accent gradient as everything else.
 */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #8b5cf6 0%, #6d5dfc 45%, #22d3ee 100%)",
          borderRadius: 7,
          color: "#fff",
          fontSize: 17,
          fontWeight: 700,
          letterSpacing: -0.5,
        }}
      >
        MS
      </div>
    ),
    size
  );
}
