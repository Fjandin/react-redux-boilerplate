"use strict";

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// Build modules array from package.json
const packageJson = require("./package.json");
const modules = [];
for (let moduleName in packageJson.dependencies) {
    if (packageJson.dependencies.hasOwnProperty(moduleName)) {
        // Ignore font-awesome as it is not a js lib
        if (moduleName === "font-awesome") {continue; }
        modules.push(moduleName);
    }
}

module.exports = {
    context: __dirname,
    devtool: "source-map",
    entry: {
        app: "./app/scripts/app.js",
        vendor: modules
    },
    output: {
        path: path.join(__dirname, "build"),
        filename: "[name].[hash].js"
    },
    module: {
        /* preLoaders: [{
            test: /\.(?:css|jsx?)$/,
            loader: "source-map-loader",
            exclude: /node_modules/,
            cacheable: true
        }],*/
        loaders: [{
            test: /\.html$/,
            loader: "html-loader",
            exclude: /node_modules/
        }, {
            test: /\.jpe?g$|\.gif$|\.png$/i,
            loader: "url-loader?limit=10000",
            exclude: /node_modules/
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!autoprefixer?browsers=last 2 version!sass-loader"),
            exclude: /node_modules/
        }, {
            test: /\.jsx?$/,
            loader: "babel-loader",
            query: {presets: ["es2015", "react"]},
            exclude: /node_modules/,
            cacheable: true
        }]
    },
    plugins: [
        new CleanWebpackPlugin(["build"]),
        new ExtractTextPlugin("[contenthash].css"),
        new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.[hash].js"),
        new HtmlWebpackPlugin({filename: "index.html", template: "./app/index.html", inject: true})
    ],
    resolve: {
        root: [
            path.join(__dirname, "app"),
            path.join(__dirname, "app/scripts")
        ],
        modulesDirectories: [
            "./node_modules"
        ],
        extensions: ["", ".js", ".jsx", ".scss", ".html"]
    },
    stats: {
        colors: true, modules: true, reasons: true
    },
    devServer: {
        port: 1337,
        contentBase: "./build"
    }
};
