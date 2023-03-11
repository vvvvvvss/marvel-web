module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui", "shared-utils"],
  images: {
    domains: ["res.cloudinary.com", "media.tenor.com", "i.imgur.com"],
  },
  experimental: {
    appDir: true,
  },
};
