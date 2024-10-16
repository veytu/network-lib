const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./webpack.base');

const config = {
    mode: 'development',
    // html-webpack-plugin 只需在开发环境时使用。
    plugins: [
        new HtmlWebpackPlugin()
    ]
}

module.exports = webpackMerge.merge(baseConfig, config);