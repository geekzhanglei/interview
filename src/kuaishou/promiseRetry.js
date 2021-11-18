/*
 * @Author: zhanglei
 * @Date: 2021-11-17 16:47:48
 * @LastEditors: zhanglei
 * @LastEditTime: 2021-11-17 18:28:52
 * @Description: 实现promise.retry 实现对fn返回的promise重试times次
 */
promise.retry = function myRetry(fn, times, delay) {
    return new Promise(function (resolve, reject) {
        function attempt() {
            fn().then(resolve).catch(function (erro) {
                if (0 == times) {
                    reject(erro)
                } else {
                    times--
                    setTimeout(attempt(), delay)
                }
            })
        }
        attempt()
    })
}