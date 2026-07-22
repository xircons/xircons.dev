import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/data/projects";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  
  if (!project) {
    return new Response("Not found", { status: 404 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: "#1A1A1A",
          color: "#FFFFFF",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: 100,
        }}
      >
        <div style={{ color: "#888888", fontSize: 36, textTransform: "uppercase", letterSpacing: 4, marginBottom: 24 }}>
          {project.eyebrow}
        </div>
        <div style={{ fontWeight: 700, fontSize: 120, lineHeight: 1 }}>
          {project.headline}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
