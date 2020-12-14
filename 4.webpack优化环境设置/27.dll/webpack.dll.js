/**
 * 使用dll技术对某些库(第三方库:jquery、react、vue...)进行单独打包
 *  当你运行webpack时，默认查找webpack.config.js
 *  需求: 需要运行webpack.dll.js 文件
 *   --->webpack --config webpack.dll.js
 * @type {{}}
 */
const {resolve} = require('path');
const webpack = require('webpack');
module.exports = {
    entry: {
        // 最终打包的生成的[name]--->jquery
        //['jQuery']--->要打包的库时jQuery
        jquery: ['jQuery']
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'dll'),
        library: '[name]_[hash]', //打包的库里面向外面暴露出去的内容叫什么名字
    },
    plugins: [
        // 帮我们生产一个manifest.json--->提供jquery映射
        new webpack.DllPlugin({
            name: '[name]_[hash]', // 映射库的暴露的内容名称
            path: resolve(__dirname, 'dll/manifest.json') //输出w文件路径
        })
    ],
    mode: 'production'
};
