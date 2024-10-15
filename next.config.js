/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // maybe known issue? maybe make false
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
};

module.exports = nextConfig;
