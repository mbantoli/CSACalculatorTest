/* eslint-disable */

const withSass = require("@zeit/next-sass");
module.exports = withSass({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]"
  },
  env: {
    GOOGLE_ANALYTICS_ID: "UA-2917893-17",
    API_URL: "https://ikosystems.cdn.prismic.io/api/v2"
  },
  webpack: function(cfg) {
    // Inject needed IE11 polifills (https://github.com/zeit/next.js/tree/1ff5005524c4e549fd8d418eb0734c674476bb5b/examples/with-polyfills)
    const originalEntry = cfg.entry;
    cfg.entry = async () => {
      const entries = await originalEntry();

      if (
        entries["main.js"] &&
        !entries["main.js"].includes("./client/polyfills.js")
      ) {
        entries["main.js"].unshift("./client/polyfills.js");
      }

      return entries;
    };

    return cfg;
  }
});
