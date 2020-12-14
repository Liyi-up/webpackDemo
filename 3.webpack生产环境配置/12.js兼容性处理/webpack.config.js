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
            /**
             * js兼容性处理:@babel/core babel-loader
             * 1.基本js兼容性处理-->@babel/preset-env
             *   缺点:只能转换基本语法，如promise不能转换
             * 2.全部js兼容性处理 ---> @babel/polyfill
             *   缺点:我只要解决部分的兼容性问题，但是将所有兼容性代码引入会增大代码的体积
             * 3.按需加载兼容性处理 --->core-js
             */
            {
                test: /\.js$/,
                exclude: /node_modules/, //排除第三方
                loader: 'babel-loader',
                options: {
                    // 预设:指示我们的babel做怎么样的兼容性处理
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                // 按需加载
                                useBuiltIns: 'usage',
                                corejs: {
                                    version: 3
                                },
                                // 指定具体兼容性需要做到哪个版本的浏览器
                                targets: {
                                    chrome: '60',
                                    firefox: '60',
                                    ie: '9',
                                    safari: '10',
                                    edge: '17'
                                }
                            }
                        ]
                    ]
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: './src/index.html'
            }
        )
    ],
    mode: 'development'
};

