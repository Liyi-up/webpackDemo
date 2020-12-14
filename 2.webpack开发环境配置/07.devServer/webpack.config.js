const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        publicPath: './',
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                // 排除css/js/html资源
                exclude: /\.(css|less|js|html)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]'
                }
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development',
    // 开发服务器 devServer 用于自动化(自动编译(打包)，自动打开浏览器,自动刷新浏览器)
    // 特点:只会在内存中编译打包，本地不会有任何输出
    // 启动devServer指令为:npx webpack-dev-server
    devServer: {
        // 启动gizp压缩，提高启动速度
        compress: true,
        // 运行路径
        contentBase: resolve(__dirname, 'build'),
        // 端口号
        port: 3000,
        // 自动打开地址:
        open:true,
        host:'localhost',
        inline: true,
        hot:true
    }
};
