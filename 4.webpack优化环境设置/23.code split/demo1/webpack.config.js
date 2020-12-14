const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //   entry: './src/index.js' 单入口 --->单页面应用（整个应用程序就一个页面复用）
    entry:{ //多入口: 有一个入口，最终输出就有一个bundle--->多页面应用
        index: './src/index.js',
        test:'./src/test.js'
    },
    output: {
        filename: '[name].[contenthash:10].js',
        path: resolve(__dirname, 'build')
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: './src/index.html',
                // 压缩html代码
                minify: {
                    // 移除空格
                    collapseWhitespace: true,
                    // 移除注释
                    removeComments: true

                }
            }
        ),

    ],
    // 生产环境下，自动压缩js代码
    mode: 'production',
};

