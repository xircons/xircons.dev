const nextConfig = {
  images: {
    qualities: [75, 100],
  },
  outputFileTracingExcludes: {
    "/*": ["public/**/*"],
  },
  // Closed projects; temporary so the slugs can be reused later.
  async redirects() {
    return ["ninjalingo", "good-night-hostel"].map((slug) => ({
      source: `/project/${slug}`,
      destination: "/#works",
      permanent: false,
    }));
  },
};

export default nextConfig;
