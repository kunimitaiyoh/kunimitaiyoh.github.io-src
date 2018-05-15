const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurifyCSSPlugin = require("purifycss-webpack");
const glob = require("glob-all");

const isProduction = process.argv.includes("-p");

module.exports = (env, argv) => ({
    mode: "development",
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
    },
    devtool: isProduction ? false : "source-map",
    devServer: {
        historyApiFallback: true,
        contentBase: "dist",
        port: 3000
    },
    module: {
        rules: [{
            test: /\.html$/,
            exclude: /node_modules/,
            loader: "html-loader"
        },
        {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader?minimize"],
        },
        {
            test: /\.(jpe?g|png|svg|ttf|woff|woff2|eot)$/,
            loaders: "file-loader?name=[name].[ext]"
        },
        {
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: [{
                loader: "babel-loader",
                options: {
                    presets: ["react"],
                    plugins: [
                        "jsx-control-statements"
                    ]
                }
            }]
        }]
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src")
        },
        extensions: [".js", ".jsx", ".css"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new ScriptExtHtmlWebpackPlugin({
            defer: [/.jsx?$/],
        }),
    ].concat(isProduction ? [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
        new PurifyCSSPlugin({
            minimize: true,
            paths: glob.sync([
                path.join(__dirname, 'public/**/*.html'),
                path.join(__dirname, 'src/**/*.jsx'),
                path.join(__dirname, 'src/**/*.css'),
            ]),
        }),
        new UglifyJsPlugin({
            sourceMap: false,
            uglifyOptions: {
                compress: true,
                output: {
                    comments: false,
                },
            },
        }),
    ] : [])
});
