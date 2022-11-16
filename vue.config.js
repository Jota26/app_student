const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});
{
  [
    {
      test: /\.css$/,
      use: ["style-loader", "css-loader"],
    },
  ];
}
