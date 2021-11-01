/*
 * @Author: zhanglei
 * @Date: 2021-10-31 21:58:18
 * @LastEditors: zhanglei
 * @LastEditTime: 2021-11-01 10:14:04
 * @Description: 发布订阅模式
 */

// 1. 补全发布订阅方法
var pubsub = {
    list: {},
    id: 0,
    subscribe: function (type, fn) {
        if (!this.list[type]) {
            this.list[type] = []
        }
        this.list[type].push({
            handler: fn,
            id: ++this.id
        })
        return this.id
    },
    unsubscribe: function (type, id) {
        if (this.list[type]) {
            if (this.list[type].length === 0) {
                delete this.list[type]
            }
            this.list[type] = this.list[type].filter(ele => ele.id !== id)
        }
    },
    publish: function (type, ...args) {
        const events = this.list[type]
        if (events && events.length) {
            events.forEach(ele => {
                ele.handler(...args)
            })
        }
    }
}

// 订阅方法
var id1 = pubsub.subscribe('example1', function (topics, name) {
    console.log(`${name}说的是${topics}`)
})
var id2 = pubsub.subscribe('example2', function (topics, name) {
    console.log(`${name}说的是${topics}`)
})
var id3 = pubsub.subscribe('example1', function (topics, name) {
    console.log(`${name}说的不是${topics}`)
})


// 发布方法/触发方法
pubsub.publish('example1', '苹果', '小红')
pubsub.publish('example1', '西红柿', '小花')
pubsub.publish('example2', '菠萝', '小明')

// 解绑方法
pubsub.unsubscribe('example1', id3)

// 再次发布/触发方法
pubsub.publish('example1', '苹果', '小红')
pubsub.publish('example1', '西红柿', '小花')
pubsub.publish('example2', '菠萝', '小明')