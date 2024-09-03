/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "i.ibb.co" }],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/:path*",
  //       destination: `http://localhost:3000/:path*`,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
