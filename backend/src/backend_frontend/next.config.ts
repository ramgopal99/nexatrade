import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.did$/,
      type: 'asset/source',
      generator: {
        filename: 'static/chunks/[path][name].[hash][ext]'
      }
    });
    return config;
  }
};

export default nextConfig;