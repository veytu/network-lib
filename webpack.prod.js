
const webpackMerge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');

const baseConfig = require('./webpack.base');
const outputType = process.env.OUTPUT_TYPE // 读取当前的输出格式（UMD/ESM）

const config = {
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true, // 去除console.log
                        drop_debugger: true,//移除自动断点功能；
                        pure_funcs: ["console.log", "console.error"],//配置移除指定的指令，如console.log,alert等
                    },
                },
            }),
        ]
    },
    //当使用ESM（ECMAScript Modules）作为输出类型时，需要启用experiments.outputModule选项
    experiments: outputType === 'esm' ? {
        outputModule: true,
    } : {},
}

module.exports = webpackMerge.merge(baseConfig, config);