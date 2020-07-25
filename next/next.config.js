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
  env: {
    API_HOST:
      process.env.NODE_ENV !== "production"
        ? "http://localhost:3030"
        : "http://localhost:3030",
    //We use localStorage to save loginUser info, set unique key here,
    //and could be distinguished by ENV
    USER_LC_KEY: "DENIUSER-" + process.NODE_ENV,
    SITE_NAME: "DENIAPPS",
    PAGE_SIZE: 20, //pagination default page size
  },
};
