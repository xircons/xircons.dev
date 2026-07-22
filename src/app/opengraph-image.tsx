import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Xircons";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#FFFFFF",
          color: "#1A1A1A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 80,
          textAlign: "center",
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 128, marginBottom: 30 }}>Xircons</div>
        <div style={{ color: "#1A1A1A", fontSize: 48, opacity: 0.7 }}>
          Minimalist portfolio showcasing UX-focused engineering and design.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
