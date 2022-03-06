const path = require("path");

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.(png|svg)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 8192,
          publicPath: "/_next/static/",
          outputPath: "static/",
          name: "[name].[ext]",
        },
      },
    });
    // Here is the magic
    // We push our config into the resolve.modules array
    config.resolve.modules.push(path.resolve("./"));
    return config;
  },
  // https://github.com/vercel/next.js/discussions/6009  - we deploy while the production is running 2/14
  cleanDistDir: false,
  // https://mmazzarolo.com/blog/2021-04-10-nextjs-scroll-restoration/ - nextjs seems to mess up the scroll to top
  experimental: {
    scrollRestoration: true,
  },
};
