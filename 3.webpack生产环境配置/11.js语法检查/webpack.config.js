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
             * 语法检查 ：eslint-loader---->eslint
             * 注意:只检查自己编写的源代码，第三方库是不会检查
             * 设置检查规则：
             *   "eslintConfig": {
                   "extends": "airbnb-base"
                 }
             * package.json中设置eslintConfig中设置规则
             * 推荐使用airbnb eslint-config-airbnb-base eslint-plugin-import eslint
             */
            {
                test: /\.js$/, //只针对js文件语法
                exclude: /node_moudules/, // 排除第三方库
                loader: 'eslint-loader',
                options: {
                    // 自动修复
                    fix: true
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

