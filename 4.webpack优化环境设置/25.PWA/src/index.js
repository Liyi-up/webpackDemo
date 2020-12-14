import '../assets/styles/index.css';
/**
 * 1.eslint 不认识window、navigator全局变量
 * 解决:需要修改package.json中eslintConfig配置 加入
 * "env": {
      "browser": true
    }
   2.serviceworker代码必须运行在服务器上
     -->node.js
     -->
        npm i serve -g
        serve -s build 启动一个服务器，将build目录下的资源作为静态资源暴露出去
 */
// 注册serviceworker
// 处理兼容性问题
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => {
        // eslint-disable-next-line
                console.log('serviceworker注册成功');
      })
      .catch(() => {
        // eslint-disable-next-line
                console.log('serviceworker注册失败');
      });
  });
}
