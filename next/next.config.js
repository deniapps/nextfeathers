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
          name: "[name].[ext]"
        }
      }
    });
    // Here is the magic
    // We push our config into the resolve.modules array
    config.resolve.modules.push(path.resolve("./"));
    return config;
  }
};
