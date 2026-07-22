import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FormStateClearer from "@/components/FormStateClearer";
import { personSchema, websiteSchema } from "@/lib/structured-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  themeColor: "#1A1A1A",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://xircons-dev.vercel.app"),
  title: {
    default: "Xircons",
    template: "%s — Xircons",
  },
  description: "Minimalist portfolio showcasing UX-focused engineering and design.",
  keywords: ["Software Engineering", "UX Design", "Web Development", "Portfolio", "Xircons"],
  authors: [{ name: "Xircons" }],
  creator: "Xircons",
  alternates: {
    canonical: "https://xircons-dev.vercel.app/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Xircons",
    description: "Minimalist portfolio showcasing UX-focused engineering and design.",
    siteName: "Xircons",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xircons",
    description: "Minimalist portfolio showcasing UX-focused engineering and design.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [personSchema(), websiteSchema()],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <FormStateClearer />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
