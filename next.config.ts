const nextConfig = {
  images: {
    qualities: [75, 100],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    outputFileTracingExcludes: {
      "/*": ["public/**/*"],
    },
  },
};

export default nextConfig;
