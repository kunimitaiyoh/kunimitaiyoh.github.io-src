const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    mode: "development",
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
    },
    devtool: "inline-source-map",
    devServer: {
        historyApiFallback: true,
        contentBase: "dist",
        port: 3000
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: [{
                loader: "babel-loader",
                options: {
                    presets: ["react"],
                    plugins: [
                        "transform-react-jsx",
                        "jsx-control-statements"
                    ]
                }
            }]
        },
        {
            test: /\.html$/,
            exclude: /node_modules/,
            loader: "html-loader"
        },
        {
            test: /\.(jpe?g|png)$/,
            loaders: "file-loader?name=[name].[ext]"
        }]
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src")
        },
        extensions: [".js", ".jsx"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
    ]
};
