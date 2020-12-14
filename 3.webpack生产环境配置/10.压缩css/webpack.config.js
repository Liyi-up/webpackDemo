const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

// 设置nodejs环境变量
// process.env.NODE_ENV = 'development';
// optimize-css-assets-webpack-plugin 用于压缩css
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',

                    {
                        loader: 'postcss-loader',
                    }


                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({ //将css单独抽离成一个文件
            filename: 'css/built.css'
        }),
        // 压缩css 调用即可
        new OptimizeCssAssetsWebpackPlugin()
    ],
    mode: 'development'
};
