import { hiddenProjectSlugs } from "./src/data/projects";

const nextConfig = {
  images: {
    qualities: [75, 100],
  },
  outputFileTracingExcludes: {
    "/*": ["public/**/*"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  // Closed and hidden projects; temporary so the slugs can be reused later.
  async redirects() {
    return [
      // The old Vercel address moves to the custom domain; preview URLs are untouched.
      {
        source: "/:path*",
        has: [{ type: "host" as const, value: "xircons-dev.vercel.app" }],
        destination: "https://xircons.dev/:path*",
        permanent: true,
      },
      ...["ninjalingo", "good-night-hostel", ...hiddenProjectSlugs].map((slug) => ({
        source: `/project/${slug}`,
        destination: "/#works",
        permanent: false,
      })),
    ];
  },
};

export default nextConfig;
