/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['api', 'commonConstantsWithClient', 'commonTypesWithClient'],
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  publicRuntimeConfig: {
    root: process.env.BASE_PATH || "",
  },
}

export default nextConfig
