console.log("index.js文件被加载了");


document.getElementById('btn').onclick = function () {
    // 懒加载~
    // 预加载：webpackPrefetch:true 会在我们使用之前，提前加入js文件(慎用)
    // 正常加载可以认为是并行加载(同一时间加载多个任务)
    // 预加载等其他资源加载完毕，浏览器空闲再偷偷加载之后会用到的资源
    // 缺点:只在pc端的一些高版本浏览器支持，移动端浏览器不支持
    import(/*webpackChunkName:'test',webpackPrefetch:true*/'./test').then(({mul, count}) => {
        console.log(mul(2, 5));
    })
};
