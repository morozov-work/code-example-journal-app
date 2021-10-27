var path = require("path");

module.exports = {
  transpileDependencies: ["vuetify"],
  lintOnSave: true,
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  },
};
