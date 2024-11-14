/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // pageExtensions: ["tsx", "ts"],
  images: {
    remotePatterns: [
      {
          protocol: 'https',
          hostname: 'api.telegram.org',
      },
      {
          protocol: 'http',
          hostname: 'localhost',
      }
  ],
}
};

module.exports = nextConfig;
