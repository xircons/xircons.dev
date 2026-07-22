import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Xircons",
    short_name: "Xircons",
    description: "Minimalist portfolio showcasing UX-focused engineering and design.",
    start_url: "/",
    display: "standalone",
    background_color: "#1A1A1A",
    theme_color: "#1A1A1A",
    icons: [
      {
        src: "/xircons-x-nobg.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
