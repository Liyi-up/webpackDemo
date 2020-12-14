/*
   webpack.config.js webpack的配置文件
     作用 : 指示webpack去干哪些活(当你运行webpack指令时，会加载里面的配置)
     所有构建工具都是基于node.js平台运行的~模块化默认采用commonjs。
 */
// resolve用来拼接绝对路径的方法
const {resolve} = require('path');
module.exports = {
    // webpack配置
    // 入口
    entry: './src/index.js',
    // 输出路径
    output: {
        // 输出文件名
        filename: 'built.js',
        // 输出路径
        // __dirname nodejs的变量，代表当前文件的目录绝对路径
        path: resolve(__dirname, 'build'),
    },
    module: {
        rules: [
            // 详细loader配置，每一条rules为一个json对象
            // 不同资源文件必须配置不容的rules
            {
                // 正则表达式用于匹配哪些文件
                test: /\.css$/,
                // 通过test匹配获取到指定文件后通过use指定使用loader进行处理
                use: [
                    // use数组中的loader执行顺序:从左到右，从下到上，依次执行
                    // 创建一个style标签，将js中的样式资源插入到标签内最后添加到页面中生效
                    'style-loader',
                    // 将css文件以字符串的形式变成commonjs模块加载到js中,里面内容是样式字符串
                    'css-loader'
                ]
            },
            { //less-loader将less文件编译成css文件
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    },
    // plugins 的配置
    plugins: [
        // 详细的plugins的配置
    ],
    // 模式
    mode: 'development', //开发模式
    // mode:'production'
};
