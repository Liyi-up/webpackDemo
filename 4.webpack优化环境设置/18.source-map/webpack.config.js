const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

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
            /**
             * 正常情况下，一个文件只能被一个loader处理
             * 当一个文件被多个loader处理，那么一定要指定loader的执行先后顺序
             * 先执行eslint 在执行babel
             */
            // { //js语法检查
            //     // 需要在package.json配置eslintConfig --->airbnb
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     enforce: 'pre', //优先执行
            //     loader: 'eslint-loader',
            //     options: {
            //         fix: true //自动修复语法不规范
            //     }
            // },
            { //js兼容性处理
                test: /\.js$/,
                exclude: /node_modules/,
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
                    esModule: false,//关闭es模块化,
                    // 解决打包后样式资源中图片引用路径错误
                    publicPath: '../images',
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
        // new OptimizeCssAssetsWebpackPlugin()

    ],
    // 生产环境下，自动压缩js代码
    mode: 'production',
    devServer: {
        compress: true,
        contentBase: resolve(__dirname, 'build'),
        port: 3000,
        open: true,
        host: 'localhost',
        inline: true,
        // 开启HMR功能
        // 当修改webpack配置必须重启webpack服务
        hot: true
    },
    devtool: 'source-map'
    /**
     * source-map: 一种 提供源代码到构建后代码映射 技术(如果构建后代码出错了,通过映射关系追踪到源代码错误)
     * [inline-|hidden-|eval-|][nosources-][cheap-[module]]source-map
     * source-map 外联
     *   提供错误代码准确信息和源代码的错误位置
     * inline-source-map 内联
     *   只生成一个内联source-map
     *   提供错误代码准确信息和源代码的错误位置
     * hidden-source-map 外部
     * 提供错误原因，但是没有错误位置，不能追踪源码错误位置，只能提示到构建后代码的位置
     * eval-source-map 内联
     *   每一个文件都对生成一个内联source-map，都在eval
     *   提供错误代码准确信息和源代码的错误位置
     * nosources-source-map  外部
     *   提供 代码准确信息，但是没有任何源码信息
     * cheap-source-map  外部
     *   提供错误代码准确信和源码的错误位置只能精确的行
     * cheap-module-source-map
     *   提供错误代码准确信息和源代码的错误位置
     *   module会将loader的sourcemap加入
     * 内联 和 外部的区别:1.外部生产了文件，内联没有 2.内联构建速度更快
     *
     * 开发环境:速度快，调试更加友好
     *   速度快(eval->inline>cheap>....)
     *   eval-cheap-source-map
     *   eval-source-map
     *   调试更加友好
     *   source-map
     *   cheap-module-source-map
     *   cheap-source-map
     * 生产环境:源代码是否需要隐藏，调试是否更加友好
     * 内联会让代码体积变大，所以一般在生产环境下不使用
     * nosources-source-map 全部隐藏
     * hidden-source-map 只隐藏源代码
     *
     * ---> source-map/cheap-module-source-map
     */
};

