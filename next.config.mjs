import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

// Keep preview assets intact when a production build runs at the same time.
/** @type {import('next').NextConfig} */
const nextConfig = (phase) => ({
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next',
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // Subpath hosting (e.g. a GitHub Pages project site at /<repo>/) needs a
  // basePath, otherwise the absolute /_next/... asset URLs 404. Leave
  // NEXT_PUBLIC_BASE_PATH unset for root hosting / a custom domain.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
});
export default nextConfig;
