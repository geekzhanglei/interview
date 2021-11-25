/*
 * @Author: zhanglei
 * @Date: 2021-11-25 14:17:45
 * @LastEditors: zhanglei
 * @LastEditTime: 2021-11-25 14:40:25
 * @Description: 原型链题目,解释以下均为true的原因
 */
console.log(Function.__proto__ === Function.prototype) // function是Function.prototype的实例，包括Function本身
console.log(Object.__proto__ === Function.prototype) // 函数是一等公民，Object也是函数的实例
console.log(Function.prototype.__proto__ === Object.prototype)
console.log(Object.prototype.__proto__ === null)