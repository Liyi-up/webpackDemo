/*
loader:1.下载 2.使用(配置loader)
plugins： 1.下载 2.引入 3.使用
 */
const {resolve} = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            // loader配置
        ]
    },
    plugins: [
        // 每一个plugin为一个函数对象
        // plugins配置
        // html-webpack-plugin
        // 功能:默认会创建一个空的HTML，自动引入打包输出的所有资源(js/css)
        // 需求:需要有结构的HTMl文件
        new HtmlWebpackPlugin({
            // 复制./src/index.html创建一个HTML./src/index.html文件,并自动引入打包输出的所有资源(js/css)
            template: './src/index.html'
        })
    ],
    mode: 'development'
};
