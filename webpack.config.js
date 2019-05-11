const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require("purifycss-webpack");
const glob = require("glob-all");
const joda = require("js-joda");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")

const isProduction = process.argv.includes("-p");

module.exports = (env, argv) => ({
    mode: isProduction ? "development" : "production",
    entry: {
        main: [path.resolve(__dirname, "src/index.tsx")]
    },
    output: {
        filename: "bundle.[name].js",
        path: path.resolve(__dirname, "dist"),
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    name: 'vendor',
                    chunks: 'initial',
                    enforce: true
                }
            }
        }
    },
    devtool: isProduction ? false : "source-map",
    devServer: {
        historyApiFallback: true,
        contentBase: ["dist", "public"],
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: "html-loader"
            },
            {
                test: /\.s?css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader",
                }),
            },
            {
                test: /\.(jpe?g|png|svg|ttf|woff|woff2|eot)$/,
                loaders: "file-loader?name=[name].[ext]"
            },
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
        plugins: [new TsconfigPathsPlugin()],
    },
    plugins: [
        new webpack.DefinePlugin({
            DEFINED_BUILD_DATE: JSON.stringify(joda.Instant.now()),
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new ScriptExtHtmlWebpackPlugin({
            defer: [/.jsx?$/],
        }),
        new ExtractTextPlugin("[name].[hash].css"),
    ].concat(isProduction ? [
        new PurifyCSSPlugin({
            minimize: true,
            paths: glob.sync([
                path.join(__dirname, 'public/**/*.html'),
                path.join(__dirname, 'src/**/*.jsx'),
            ]),
            purifyOptions: {
                minify: true,
                whitelist: [ "*:not*" ],
            },
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
