import { readFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const contentType = "image/png";
export const size = {
  width: 180,
  height: 180,
};

export default function AppleIcon() {
  const imagePath = path.join(process.cwd(), "public", "xircons-x-nobg.png");
  let imageBuffer;
  try {
    imageBuffer = readFileSync(imagePath);
  } catch (e) {
    // Fallback if image is missing, render text
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 120,
            background: "#1A1A1A",
            color: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "20%",
          }}
        >
          X
        </div>
      ),
      { ...size }
    );
  }

  return new Response(imageBuffer, {
    headers: { "Content-Type": contentType },
  });
}
