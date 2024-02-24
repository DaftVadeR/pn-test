const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    
    return config;
  },
  images: {
    remotePatterns: [{
      protocol: 'https',
        hostname: 'placehold.co', // For test images
        port: '',
    }]
  },
  transpilePackages: ['@tw-classed/react'],
};

module.exports = nextConfig;
