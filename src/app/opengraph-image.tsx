import { ImageResponse } from "next/og";
import { BrandMark } from "@/components/BrandMark";

export const alt = "Tisee — Software, Automation & AI";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FFFFFF",
          color: "#09090B",
          padding: "72px 82px",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <BrandMark size={52} color="#09090B" cutout="#FFFFFF" />
          <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 4 }}>TISEE</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 960 }}>
          <div style={{ fontSize: 72, lineHeight: 1.03, fontWeight: 700, letterSpacing: -3.5 }}>
            Software, Automation & AI.
          </div>
          <div style={{ marginTop: 24, fontSize: 30, lineHeight: 1.35, color: "#52525B" }}>
            Backend development, automation, AI, and selected work.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 18, color: "#71717A" }}>
          <span>tisee.site</span>
          <span>2026</span>
        </div>
      </div>
    ),
    size,
  );
}
