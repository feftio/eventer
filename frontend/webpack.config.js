const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  devtool: "inline-source-map",
  resolve: {
    extensions: ["*", ".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "js/bundle.[contenthash].js",
    clean: true,
    assetModuleFilename: "static/[hash][ext][query]",
  },
  devServer: {
    compress: true,
    port: 3000,
    hot: true,
    open: false,
    historyApiFallback: true,
    static: [
      { directory: path.resolve(__dirname, "dist"), watch: true },
      { directory: path.resolve(__dirname, "public"), watch: true },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: "index.html",
      favicon: "public/favicon.ico",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: ["html-loader"],
      },

      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },

      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
