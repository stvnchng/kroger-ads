/** @type {import('next').NextConfig} */

// webpack: (config) => { config.externals.push({ sharp: 'commonjs sharp', canvas: 'commonjs canvas' }) return config }

const nextConfig = () => {
  const rewrites = () => {
    return [
      {
        source: "/kroger",
        destination:
          "https://www.kroger.com/atlas/v1/savings-coupons/v1/coupons",
        has: [
          {
            type: "header",
            key: "X-Kroger-Channel",
          },
          {
            type: "header",
            key: "X-Laf-Object",
          },
        ],
      },
      // ...Object.keys(stores).map((zone) => {
      //   return {
      //     source: "/" + zone,
      //     destination: stores[zone],
      //   };
      // }),
      {
        source: "/coupons",
        destination:
          "https://dam.flippenterprise.net/flyerkit/publications/krogercolumbus",
        has: [
          {
            type: "header",
            key: "X-Kroger-Channel",
          },
          {
            type: "header",
            key: "X-Laf-Object",
          },
        ],
      },
    ];
  };
  return {
    rewrites,
    images: {
      domains: ["cdnws.softcoin.com"],
    },
    webpack: (config) => {
      config.module.rules.push({
        test: /\.node$/,
        use: "node-loader",
      });

      return config;
    },
  };
};

module.exports = nextConfig;
