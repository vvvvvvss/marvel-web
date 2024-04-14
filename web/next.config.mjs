/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "res.cloudinary.com", protocol: "https" },
      { hostname: "media.tenor.com", protocol: "https" },
      { hostname: "i.imgur.com", protocol: "https" },
    ],
  },
};

export default nextConfig;
