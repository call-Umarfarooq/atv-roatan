/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['stripe'],
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'hk0gswgg8cgs0wg04scwsgok.72.62.242.32.sslip.io',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      }
    ],
  },
};

export default nextConfig;
