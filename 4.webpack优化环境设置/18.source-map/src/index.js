// 引入font
import '../assets/font/font-icon.css';
import '../assets/styles/index.less';
import  print  from './print';

function add(x, y) {
  return x + y;
}

print();
console.log(add(1, 2));

if (module.hot) {
  // 一旦module中存在hot属性，说明开启HMR功能。---->HMR功能生效
  module.hot.accept('./print.js', () => {
    // 方法会监听 print.js文件变化，一旦发生变化，其他默模块认不会重新打包构建。
    // 会执行后面的回调函数
    print();
  });
}
