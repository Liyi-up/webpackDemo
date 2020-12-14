
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

        new HtmlWebpackPlugin({
            // 复制./src/index.html创建一个HTML./src/index.html文件,并自动引入打包输出的所有资源(js/css)
            template: './src/index.html'
        })
    ],
    mode: 'production',
    externals: {
        // 拒绝jQuery被打包
        jquery:'jQuery'
    }
};
