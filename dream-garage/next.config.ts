import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable React 19
  experimental: {
    reactMode: 'concurrent',
    serverComponentsExternalPackages: ['three', '@react-three/fiber', '@react-three/drei'],
  },
  
  // Image optimization for 3D textures
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.sketchfab.com',
      },
      {
        protocol: 'https',
        hostname: '*.polyhaven.com',
      },
    ],
    // Allow larger images for high-res textures
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 1024, 2048, 4096],
  },
  
  // Webpack configuration for 3D assets
  webpack: (config, { isServer }) => {
    // Add support for GLB/GLTF files
    config.module.rules.push({
      test: /\.(glb|gltf|hdr|exr)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name][ext][query]',
      },
    });
    
    // Add support for audio files
    config.module.rules.push({
      test: /\.(mp3|wav|ogg|aac)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name][ext][query]',
      },
    });
    
    return config;
  },
  
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
  
  // Redirects for clean URLs
  async redirects() {
    return [
      {
        source: '/garage',
        destination: '/garage/grid',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
