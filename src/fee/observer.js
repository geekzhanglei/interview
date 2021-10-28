
/**
 * 目标:
 * 实现一个简单的观察者模式(或发布-订阅模式)
 */


const shop = {
    apple: 5, // 苹果5元
    potato: 2, // 马铃薯 2元
    tomato: 3, // 西红柿 3元
    orange: 7, // 橙子7元
}

/**
 * 现在我们有一个便利店的实例对象，目标是需要增加对商品价格的监听，当商品价格发生变化时，触发对应的事件。
 * 1、小明关注苹果价格变化
 * 2、小刚关注橙子价格变化
 * 3、当价格变化时，自动触发对应的事件
 */

class Pubsub {
    constructor() {
    }

    list = {};

    // 监听方法，添加监听者，监听对象，和监听事件的方法，
    // 提示，可以将移除方法作为监听方法的返回值
    listen = (name, who, fn) => {
        /** 该如何定义 监听方法？ **/
        fn.call(fn, name, who)
    }

    // 发布消息的方法
    publish = () => {
        /** 该如何定义 发布方法？ **/
    }


}

// 定于一个Pubsub的实例对象
const pubsub = new Pubsub();

const event1 = pubsub.listen('apple', '小明', (listener, price) => {
    console.log(`${listener}关注的apple的最新价格是${price}元`);
})

const event2 = pubsub.listen('apple', '小强', (listener, price) => {
    console.log(`${listener}关注的apple的最新价格是${price}元`);
})

const event3 = pubsub.listen('orange', '小刚', (listener, price) => {
    console.log(`${listener}关注的orange的最忌价格是${price}元`);
})

const event4 = pubsub.listen('orange', '小强', (listener, price) => {
    console.log(`${listener}关注的orange的最忌价格是${price}元`);
})

/**
 * 应该补充怎样的逻辑能够使得我们能够监听shop中的属性值变化呢？
 * 提示：vue中双向绑定是怎么实现的呢？
 * vue2.0或vue3.0的实现方式都是可以的
 */

/** 我们设置一个观察者方法，让 shop这个实例对象便成为可观察对象 **/
const observable = (data) => {
    for (var i in data) {
        Object.defineProperties(data, data[i], {
            get: () => {
                return data[i]
            },
            set: (item) => {
                // 此处应该调用监听方法
                pubsub
            }
        })
    }
};

const newShop = observable(shop);

newShop.apple = 6;
/** 小明关注了苹果的价格，苹果价格变更将会触发事件
 ** console.log将会输出:  小明关注的apple的最新价格是6元
 **/

newShop.tomato = 10;
/** 无人关注西红柿价格，不会触发事件 **/

newShop.orange = 11;
/** 小刚关注了橙子的价格，橙子价格变更将会触发事件
 ** console.log将会输出:  小刚关注的orange的最新价格是11元
 **/

console.log(newShop);
/**
 ** 输入新的shop
 **/

console.log(newShop.apple);