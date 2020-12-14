const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const WorkBoxWebpackPlugin = require('workbox-webpack-plugin');
/**
 * PWA:渐进式网络应用程序(离线可访问)
 * workbox--->workbox-webpack-plugin
 * @type {string}
 */
// 定义环境变量:决定使用 browserslist 的哪个模式配置 默认:production
process.env.NODE_ENV = 'production';
// 复用loader

module.exports = {

    entry: ['./src/index.js', './src/index.html'], //将html添加到入口中便于开启html的HMR功能
    output: {
        publicPath: './',
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            //处理less与css
            {
                test: /\.(less|css)$/,
                use: [
                    // 抽取css文件
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    { // css兼容处理
                        loader: 'postcss-loader',
                    },
                    'less-loader'
                ]
            },

            { //js语法检查
                // 需要在package.json配置eslintConfig --->airbnb
                test: /\.js$/,
                exclude: /node_modules/,
                enforce: 'pre', //优先执行
                loader: 'eslint-loader',
                options: {
                    fix: true //自动修复语法不规范
                }
            },
            { //js兼容性处理
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    /**
                     * 开启多进程打包
                     * 进程开启是需要时间的 600ms，进程通讯也需要花时间
                     * 只有工作消耗时间比较长，才需要多进程打包
                     */
                    loader: 'thread-loader',
                    options: {
                        workers:2 //进程2个
                    }

                }],
                loader: 'babel-loader',
                options: { //具体规则
                    presets: [ //预设置
                        [
                            '@babel/preset-env', //基础语法兼容
                            {//按需全兼容
                                useBuiltIns: 'usage',
                                corejs: {version: 3},
                                targets: { //指定兼容最低版本
                                    firefox: '60',
                                    ie: '9',
                                    safari: '10',
                                    edge: '17'
                                }
                            }
                        ]
                    ]
                }
            },
            { //处理图片 默认使用es模块化处理
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: '[hash:10].[ext]',
                    outputPath: 'images',
                    esModule: false //关闭es模块化
                }
            },
            {//处理html中的图片 使用的是commonjs模块化处理
                test: /.html$/,
                loader: 'html-loader',
            },
            { //将一些其他文件统一打包到指定目录
                exclude: /\.(html|css|less|jpg|png|gif|js)$/,
                loader: 'file-loader',
                options: {
                    output: 'media'
                }
            }

        ]
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
        // 抽取css
        new MiniCssExtractPlugin(
            {filename: 'styles/index.css'}
        ),
        // 压缩css
        new OptimizeCssAssetsWebpackPlugin(),
        new WorkBoxWebpackPlugin.GenerateSW({
            /**
             * 1.帮助serviceworker快速启动
             * 2.去除旧的serviceworker
             * 生产一个serviceworker配置文件
             */
            clientsClaim: true,
            skipWaiting: true
        })
    ],
    // 生产环境下，自动压缩js代码
    mode: 'production',
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 3000,
        open: true,
        // 开启HMR功能
        // 当修改webpack配置必须重启webpack服务
        hot: true
    }
};

