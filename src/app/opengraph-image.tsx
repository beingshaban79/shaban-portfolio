import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

/**
 * Social share card, generated at build time from the same data as the page.
 * No Photoshop round-trip, and it can never drift out of date.
 */
export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0f",
          padding: 72,
          position: "relative",
        }}
      >
        {/* accent blooms */}
        <div
          style={{
            position: "absolute",
            top: -220,
            left: -160,
            width: 680,
            height: 680,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(109,93,252,0.42), rgba(109,93,252,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -260,
            right: -140,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(34,211,238,0.3), rgba(34,211,238,0) 70%)",
          }}
        />

        {/* top row */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(135deg, #8b5cf6 0%, #6d5dfc 45%, #22d3ee 100%)",
              color: "#fff",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            MS
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 16px",
              borderRadius: 9999,
              border: "1px solid rgba(52,211,153,0.35)",
              background: "rgba(52,211,153,0.1)",
              color: "#6ee7b7",
              fontSize: 20,
            }}
          >
            <div
              style={{
                width: 9,
                height: 9,
                borderRadius: 9999,
                background: "#34d399",
              }}
            />
            {profile.availability.label}
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              color: "#a1a1aa",
              textTransform: "uppercase",
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              fontSize: 74,
              lineHeight: 1.04,
              fontWeight: 700,
              color: "#f5f5f7",
              maxWidth: 940,
              letterSpacing: -2.5,
            }}
          >
            {profile.role}
          </div>
          <div
            style={{
              fontSize: 38,
              fontWeight: 600,
              background:
                "linear-gradient(100deg, #8b5cf6, #6d5dfc 40%, #22d3ee)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {`${profile.specialism} · 3+ years`}
          </div>
        </div>

        {/* footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            fontSize: 22,
            color: "#71717a",
            borderTop: "1px solid rgba(255,255,255,0.09)",
            paddingTop: 26,
          }}
        >
          <span>{profile.location}</span>
          <span>·</span>
          <span>React Native</span>
          <span>·</span>
          <span>SwiftUI</span>
          <span>·</span>
          <span>UIKit</span>
        </div>
      </div>
    ),
    size
  );
}
