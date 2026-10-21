import type { Metadata } from "next";

export const SITE_URL = "https://xircons.dev";
export const CONTACT_EMAIL = "hello@xircons.dev";

export const baseOpenGraph: NonNullable<Metadata["openGraph"]> = {
  type: "website",
  locale: "en_US",
  siteName: "Xircons",
  images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
};
