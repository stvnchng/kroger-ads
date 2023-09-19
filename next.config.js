/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.pdf$/,
        use: ["file-loader"],
      },
      {
        test: /\.node$/,
        use: ["node-loader"],
      }
    );

    return config;
  },
};

module.exports = nextConfig;
