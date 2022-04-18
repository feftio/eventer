const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = function (env) {
    const mode = env.mode;
    const isProduction = mode === "production";
    return {
        mode: mode,
        entry: "./src/index.tsx",
        devtool: "inline-source-map",
        resolve: {
            extensions: ["*", ".ts", ".tsx", ".js", ".jsx"],
            alias: {
                src: path.resolve(__dirname, "src/"),
                styles: path.resolve(__dirname, "src/assets/styles"),
            },
        },
        output: {
            path: path.join(__dirname, "dist"),
            filename: isProduction
                ? "js/bundle.[contenthash].js?"
                : "js/bundle.js?[contenthash]",
            clean: true,
            assetModuleFilename: isProduction
                ? "static/[name].[hash][ext][query]"
                : "static/[name][ext][query]?[hash]",
        },
        devServer: {
            compress: true,
            port: 3000,
            hot: true,
            open: false,
            historyApiFallback: true,
            static: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "public/index.html",
                filename: "index.html",
                favicon: "public/favicon.ico",
            }),
            new MiniCssExtractPlugin({
                filename: isProduction
                    ? "css/[name].[contenthash].css"
                    : "css/[name].css?[contenthash]",
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
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                importLoaders: 2,
                                modules: {
                                    localIdentName: "[local]-[hash:base64:5]",
                                },
                            },
                        },
                        "sass-loader",
                    ],
                    include: /\.module\.(sa|sc|c)ss$/,
                },

                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader",
                    ],
                    exclude: /\.module\.(sa|sc|c)ss$/,
                },

                {
                    test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                    type: "asset/resource",
                },
            ],
        },
    };
};
