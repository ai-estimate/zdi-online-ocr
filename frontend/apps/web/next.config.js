/**
 * @type {import('next').NextConfig}
 */

const withSvgr = require('next-plugin-svgr');
const isProd = process.env.NODE_ENV === 'production';

let config = {
  swcMinify: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  svgrOptions: {
    titleProp: false,
    icon: true,
  },
  transpilePackages: ['@zdi/mui'],
  compiler: {
    removeConsole: isProd,
  },
  optimizeFonts: true,
  reactStrictMode: !isProd,
};

let withConfig = withSvgr(config);
if (isProd) {
  const withPWA = require('next-pwa');
  withConfig = withPWA({
    pwa: {
      disable: !isProd,
      dest: 'public',
    },
    ...withConfig,
  });
}

module.exports = withConfig;
