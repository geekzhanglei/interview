/*
 * @Author: zhanglei
 * @Date: 2021-12-17 12:10:50
 * @LastEditors: zhanglei
 * @LastEditTime: 2021-12-17 12:51:28
 * @Description: async await promise
 */

var async1 = async () => {
    console.log('async1');
    setTimeout(() => {
        console.log('timer1')
    }, 2000)
    await new Promise(resolve => {
        console.log('promise1') // 这里非常重要，因为没有返回，promise pending了
    })
    console.log('async1 end') // 这段代码在微任务里，不需要记忆“await是让出线程的标志”，只需要await改写promise
    return 'async1 success' // 因为没有返回，async1 success的promise值也不会返回
}

console.log('script start');

async1().then(res => console.log(res));

console.log('script end');

Promise.resolve(1)
    .then(2)
    .then(Promise.resolve(3)) // 与下面写法是一样的，也是穿透
    .catch(4)
    .then(res => console.log(res))

Promise.resolve(1)
    .then(2)
    .then(3)
    .catch(4)
    .then(res => console.log(res))

setTimeout(() => {
    console.log('timer2')
}, 1000)

// 输出结果为
// script start
// async1
// promise1
// script end
// 1
// 1
// timer2
// timer1

// await 改写promise
await new Promise(resolve => {
    console.log('promise1')
})
console.log('async1 end')
// 改写后,分别位于promise的构造函数和then中
new Promise((resolve) => {
    // new Promise(resolve => {
    //     console.log('promise1')
    // })
    resolve()
}).then(res => {
    // console.log('async1 end')
})