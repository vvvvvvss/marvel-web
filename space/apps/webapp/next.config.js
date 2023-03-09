module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  experimental: {
    appDir: true,
  },
};
