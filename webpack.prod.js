/* eslint "no-console": 0 */
/* eslint "strict": 0 */
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

let config = {
    context: __dirname,
    devtool: "hidden-source-map",
    entry: {
        app: "./app/scripts/entry.js",
        vendor: modules
    },
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "/",
        filename: "[name].[hash].js"
    },
    module: {
        noParse: [],
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
            loader: "babel-loader?presets[]=es2015,presets[]=react",
            exclude: /node_modules/
        }, {
            test: /\.svg$|\.woff2?$|\.ttf$|\.eot$/,
            loader: "file"
        }]
    },
    plugins: [
        new CleanWebpackPlugin(["dist"]),
        new ExtractTextPlugin("app.[contenthash].css"),
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.[hash].js"),
        new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
        new HtmlWebpackPlugin({filename: "index.html", template: "./app/index.html"}),
        new webpack.DefinePlugin({"process.env.NODE_ENV": JSON.stringify("production")})
    ],
    resolve: {
        alias: {},
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
        colors: false, modules: true, reasons: true
    }
};

module.exports = config;
