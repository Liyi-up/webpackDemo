const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        publicPath: './',
        filename: "built.js",
        path: resolve(__dirname, 'build')

    },
    module: {
        rules: [
            {
                test: /\.(less|css)$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            // 问题:默认处理不了html中的img标签的图片
            { // 处理图片资源
                // 使用一个loader
                // 下载url-loader file-loader
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    // 当发现图片大小小于8kb,就会被base64处理
                    // 优点:减少请求数量(减轻服务器压力)
                    // 缺点:图片体积会变大(文件请求速度更慢)
                    limit: 8 * 1024,
                    // 问题:因为url-loader默认使用es6模块化解析，而html-loader引入图片是common.js
                    // 解析:时会出现问题:[Object Module]
                    // 解决: 关闭url-loader的es6模块解析，使用common.js解析
                    esModule: false,
                    // 给图片重命名
                    // [hash:10]取图片的hash前10位
                    // [ext]去文件原来的扩展名
                    name: '[hash:10].[ext]'
                }
            },
            {
                test: /\.html$/,
                // 处理html 中img标签图片(负责引入img,从而能够被url-loader进行处理)
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: "development"
};
