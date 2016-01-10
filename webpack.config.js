/* eslint "no-console": 0 */
/* eslint "strict": 0 */
"use strict";

const fs = require("fs");
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

// Helper for speeding things a bit up by using built/minified libs files
const node_modules_dir = path.join(__dirname, "node_modules");
let deps = [];
const addMinifiedDep = (lib, lib_path) => {
    let index = modules.findIndex((l) => l === lib);
    if (index < 0) {
        throw new Error("lib " + lib + " does not exist in package.json");
    } else if (!fs.existsSync(path.join())) {
        throw new Error("file " + lib_path + " does not exist");
    }
    modules[index] = lib_path;
    deps.push(lib_path);
};

// Speed up build by using built files
addMinifiedDep("babel-polyfill", "babel-polyfill/dist/polyfill.js");
addMinifiedDep("react", "react/dist/react.js");
addMinifiedDep("react-dom", "react-dom/dist/react-dom.js");
addMinifiedDep("react-redux", "react-redux/dist/react-redux.js");
addMinifiedDep("redux", "redux/dist/redux.js");
addMinifiedDep("redux-logger", "redux-logger/dist/index.js");

let config = {
    context: __dirname,
    devtool: "source-map",
    entry: {
        app: "./app/scripts/entry.js",
        vendor: modules
    },
    output: {
        path: path.join(__dirname, "build"),
        filename: "[name].[hash].js"
    },
    module: {
        noParse: [],
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
        }, {
            test: /\.svg$|\.woff2?$|\.ttf$|\.eot$/,
            loader: "file"
        }]
    },
    plugins: [
        new CleanWebpackPlugin(["build"]),
        new ExtractTextPlugin("[contenthash].css"),
        // new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.[hash].js"),
        new HtmlWebpackPlugin({filename: "index.html", template: "./app/index.html", inject: true})
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
        colors: true, modules: true, reasons: true
    },
    devServer: {
        port: 1337,
        contentBase: "./build",
        historyApiFallback: {
            index: "/index.html"
        }
    }
};

deps.forEach((dep) => {
    config.resolve.alias[dep.split(path.sep)[0]] = dep;
    config.module.noParse.push(dep);
});

module.exports = config;
