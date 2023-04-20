/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true
  },
  compress: true,
  experimental: {
    appDir: false
  }
}


module.exports = nextConfig