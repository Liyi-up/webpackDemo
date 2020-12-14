function sum(...args) {
    return args.reduce((p, c) => p + c, 0);
}

/**
 * 通过js代码，来让某个文件单独打包成一个chunk
 * 设置引入模块的名称为test
 * /* webpackChunkName:'test'*/

import (/* webpackChunkName:'test'*/
    './test'
    ).then(
    (res) => {
        // 文件加载失败
        // eslint-disable-next-line
        console.log(res);
        console.log("文件加载成功");
    }
).catch(() => {
        //文件加载成功
        // eslint-disable-next-line
        console.log("文件加载失败")
    }
);

// eslint-disable-next-line
console.log(sum(1, 2, 3, 4));


