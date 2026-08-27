import { ImageResponse } from "next/og";

export const alt = "Tisee developer portfolio";
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
          <div style={{ display: "flex", alignItems: "baseline", gap: 4, fontSize: 40, fontWeight: 800, letterSpacing: -2 }}>
            <span>T</span>
            <span style={{ fontSize: 28, fontWeight: 600 }}>/</span>
            <span style={{ fontSize: 18 }}>•</span>
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 4 }}>TISEE</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 920 }}>
          <div style={{ fontSize: 78, lineHeight: 1.02, fontWeight: 700, letterSpacing: -4 }}>
            Developer portfolio.
          </div>
          <div style={{ marginTop: 24, fontSize: 30, lineHeight: 1.35, color: "#52525B" }}>
            Projects, experience, and the things I build.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 18, color: "#71717A" }}>
          <span>tisee-portfolio-v2.vercel.app</span>
          <span>2026</span>
        </div>
      </div>
    ),
    size,
  );
}
