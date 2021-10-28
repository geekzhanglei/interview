/*
 * @Author: zhanglei
 * @Date: 2021-10-28 12:27:10
 * @LastEditors: zhanglei
 * @LastEditTime: 2021-10-29 11:20:42
 * @Description: 实现一个event bus
 */

// const o = {
//     on(event, cb) { },
//     emit(event) { },
//     // 不带参、带一个参数、带两个参数
//     off(event, cb) { },
//     once(event, cb) { }
// };
// // 例子
// const fn = (a) => console.log(a);
// o.on('test', fn);
// o.on('test', fn);
// o.once('test', fn);
// o.emit('test', 1); // 1 1 1
// o.emit('test', 2); // 2 2
// o.emit('test', 1); // 1 1

// 我的写法
class o {
    list = {}
    constructor() { }
    on(event, cb) {
        if (!this.list[event].length) {
            this.list[event] = [cb]
        } else {
            this.list[event].push(cb)
        }
    }
    emit(event) {
        for (let cb of this.list[event]) {
            cb()
            if (cb.prototype.once) {
                this.off(eventName, cb)
            }
        }
        for (let attr in this.list[event]) {
            if (attr === 'once') {
                this.list[event]['once'] = null
            }
        }
    }
    // 不带参、带一个参数、带两个参数
    off(event, cb) {
        if (!event && !cb) {
            this.list[event] = []
            return
        }
        this.list[event].filter(ele => {
            return ele !== cb
        })
    }
    once(event, cb) {
        // 法一
        this.list[event]['once'] = cb
        // 法二
        // 也可以写在cb的原型上，emit时，判断原型上是否有once，有的话需要解绑
        // cb.prototype.once = true
        // this.on(event, cb)

        // 法三
        // 正常写，记录once次数，emit时pop对应次数once绑定
    }
}