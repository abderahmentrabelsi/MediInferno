/** @type {import('next').NextConfig} */
const nextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: `${process.env.API_URL}/api/:path*`
  //     }
  //   ];
  // }
  swcMinify: true,
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
    nextScriptWorkers: true
  },
  output: 'standalone'
};

module.exports = nextConfig;
