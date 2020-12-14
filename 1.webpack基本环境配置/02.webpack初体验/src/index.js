/**
 * index.js：webpack入口文件
 *
 * 1.运行指令:
 *   开发环境:webpack ./src/index.js -o ./build--mode=development
 *   webpack会以./src/main.js为入口文件开始打包，打包后输入到./build
 *   整体打包环境，是开发环境
 *   生产环境:webpack ./src/index.js -o ./build --mode=production
 *   webpack会以./src/main.js为入口文件开始打包，打包后输入到./build
 *   整体打包环境，是生成环境
 *
 * 2.结论:
 *   1.webpack能处理js/json资源，对于css/png资源webpack需要借助loader将这两种资源翻译
 *   3.生成环境/开发环境目前的区别就是生成环境比开发环境多一个压缩文件的plugin
 *   4.生成环境/开发环境可以将ES6模块化编译成浏览器可以识别的模块化~
 */
import data from './data';
// import './index.css'
console.log(data);

function add(x, y) {

    return x + y;
}

console.log(add(1, 2));

