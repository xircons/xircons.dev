import { CONTACT_EMAIL, SITE_URL } from "./site";

export const PERSON_ID = `${SITE_URL}/#person`;

export function personRef() {
  return { "@id": PERSON_ID };
}

export function personSchema() {
  return {
    "@id": PERSON_ID,
    "@type": "Person",
    name: "Wuttikan Suksan",
    alternateName: "Xircons",
    url: SITE_URL,
    image: `${SITE_URL}/wuttikan/wuttikan-suksan.jpg`,
    jobTitle: "Full-stack Developer",
    email: CONTACT_EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chiang Mai",
      addressCountry: "TH",
    },
    knowsAbout: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "PostGIS", "Python", "FastAPI", "Tailwind CSS", "Docker"],
    sameAs: [
      "https://github.com/xircons",
      "https://www.facebook.com/pppwtk",
      "https://www.instagram.com/pppwtk",
      "https://www.linkedin.com/in/wuttikan-suksan",
      "https://www.npmjs.com/~xirconsss",
    ],
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    name: "Xircons",
    url: SITE_URL,
    publisher: personRef(),
  };
}

export function breadcrumbSchema(items: { name: string; url?: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}

export function softwareApplicationSchema({
  name,
  url,
  imageUrl,
  description,
  applicationCategory = "DeveloperApplication",
}: {
  name: string;
  url: string;
  imageUrl: string;
  description: string;
  applicationCategory?: string;
}) {
  return {
    "@type": "SoftwareApplication",
    name,
    url,
    image: imageUrl,
    description,
    author: personRef(),
    applicationCategory,
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export function creativeWorkSchema({
  name,
  url,
  imageUrl,
  description,
}: {
  name: string;
  url: string;
  imageUrl: string;
  description: string;
}) {
  return {
    "@type": "CreativeWork",
    name,
    url,
    image: imageUrl,
    description,
    author: personRef(),
  };
}
