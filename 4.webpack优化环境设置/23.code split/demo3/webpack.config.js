const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',     //单入口 --->单页面应用（整个应用程序就一个页面复用）
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
    /*
    可以将node_modules中的代码单独提出打包成一个chunk最终输出
    自动分析多入口环境中有没有共同的依赖/文件，如果有就会打包成单独的chunk
     */
    optimization: {
        splitChunks: {
            chunks: "all"

        }
    },
    // 生产环境下，自动压缩js代码
    mode: 'production',
};

