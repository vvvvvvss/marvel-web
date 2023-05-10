const { PrismaPlugin } = require("experimental-prisma-webpack-plugin");

module.exports = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }

    return config;
  },
  transpilePackages: ["ui", "shared-utils", "database"],
  images: {
    domains: ["res.cloudinary.com", "media.tenor.com", "i.imgur.com"],
  },
  experimental: {
    appDir: true,
  },
};
