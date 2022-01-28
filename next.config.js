/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://locahost:3000/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
