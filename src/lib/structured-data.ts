export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Xircons",
    url: "https://xircons-dev.vercel.app",
    jobTitle: "Software Engineer & UX Designer",
    sameAs: [
      "https://github.com/xircons",
      // add other socials here if available
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Xircons",
    url: "https://xircons-dev.vercel.app",
  };
}

export function breadcrumbSchema(items: { name: string; url?: string }[]) {
  return {
    "@context": "https://schema.org",
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
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    url,
    image: imageUrl,
    description,
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
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name,
    url,
    image: imageUrl,
    description,
    author: {
      "@type": "Person",
      name: "Xircons",
    },
  };
}
