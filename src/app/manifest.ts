import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Xircons",
    short_name: "Xircons",
    description: "Portfolio of Xircons, a full-stack developer in Chiang Mai building systems for government agencies and universities.",
    start_url: "/",
    display: "standalone",
    background_color: "#1A1A1A",
    theme_color: "#1A1A1A",
    icons: [
      {
        src: "/logo/xircons-x-nobg.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
