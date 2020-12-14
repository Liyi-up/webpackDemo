// import '@babel/polyfill';
const add = (x, y) => {
    return x + y;
};
console.log(add(2, 2));
const pro = new Promise((resolve) => {
        setTimeout(() => {
            console.log('定时器执行完毕');
            resolve('执行完毕')
        }, 1000)
    });

console.log(pro.then());
