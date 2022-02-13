const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const webpack = require("webpack");

module.exports = [new ForkTsCheckerWebpackPlugin()];

module.exports = [new webpack.ExternalsPlugin("commonjs", ["electron"])];
