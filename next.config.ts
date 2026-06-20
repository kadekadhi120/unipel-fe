import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // reactCompiler: true, // Disabled due to memoization issues
  reactStrictMode: true,
};

export default nextConfig;
