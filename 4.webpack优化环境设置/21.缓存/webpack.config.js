const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

/**
 * 缓存:
 *  babel缓存
 *     cacheDirectory: true
 *  文件资源缓存
 *     hash：每次webpack打包都会生成一个唯一的hash值
 *     缺点:因为js和css同时使用一个hash值
 *          如果重新打包，会导致所有缓存失效。（可能我只改动了一个文件）
 *     chunkhash:根据chunk生产hash值，如果打包来源同一个chunk，那么hash值一样
 *     缺点:js和css还是同一个hash值，因为css与js是在同一个入口引进，所以同属于一个chunk
 *     contenthash:根据文件内容生成hash值，不同的文件hash值一定不一样
 *
 * @type {string}
 */
// 定义环境变量:决定使用 browserslist 的哪个模式配置 默认:production
process.env.NODE_ENV = 'production';
// 复用loader

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.[contenthash:10].js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            /**
             * 正常情况下，一个文件只能被一个loader处理
             * 当一个文件被多个loader处理，那么一定要指定loader的执行先后顺序
             * 先执行eslint 在执行babel
             */
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
            {
                // 一下loader只会匹配一个，解决了之前每个文件都会去一一匹配一次loader
                // 不能有两个配置文件处理同一个文件
                oneOf: [
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
                                            chrome: '60',
                                            fix: '50'
                                        }
                                    }
                                ]
                            ],
                            //开启babel缓存
                            //第二次构建时，会读取之前的缓存，从而提高构建速度
                            cacheDirectory: true
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
            {filename: 'styles/index.[contenthash:10].css'}
        ),
        // 压缩css
        new OptimizeCssAssetsWebpackPlugin()

    ],
    // 生产环境下，自动压缩js代码
    mode: 'production',
    devtool: 'source-map'
};

