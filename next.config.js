/** @type {import('next').NextConfig} */
// next.config.js
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["images.unsplash.com", "plus.unsplash.com", "firebasestorage.googleapis.com"],
  },
  async headers() {
    return [
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Link',
            value: '/assets/logoSmallScreen.svg',
          },
        ],
      },
    ];
  },
  
};

module.exports = nextConfig;

/** @stysdhs */