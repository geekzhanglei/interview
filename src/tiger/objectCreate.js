/*
 * @Author: zhanglei
 * @Date: 2021-10-26 17:08:21
 * @LastEditors: zhanglei
 * @LastEditTime: 2021-10-26 19:03:57
 * @Description: Object.create 详解
 */

/**
 * @description: 1. Object.create() es6创建对象的另一种方式，可以理解为继承一个对象, 添加的属性是在原型下
 * @param {*}
 * @return {*}
 */
var a = { rep: 'apple' }
var b = Object.create(a)
console.log(b)  // {}
console.log(b.__proto__) // {rep: "apple"}
console.log(b.rep) // {rep: "apple"}

/**
 * @description: 2. Object.create() 用第二个参数来创建非空对象的属性描述符默认是为false的，而构造函数或字面量方法创建的对象属性的描述符默认为true。看下图解析：
 * @param {*}
 * @return {*}
 */
// 创建一个以另一个空对象为原型,且拥有一个属性p的对象
o = Object.create({}, { p: { value: 42 } })

// 省略了的属性特性默认为false,所以属性p是不可写,不可枚举,不可配置的:
o.p = 24
o.p
//42

o.q = 12
for (var prop in o) {
    console.log(prop)
}
//"q"

delete o.p
//false

/**
 * @description: 3. 当用构造函数或对象字面量方法创建空对象时，对象时有原型属性的，即有_proto_;
当用Object.create()方法创建空对象时，对象是没有原型属性的。
 * @param {*}
 * @return {*}
 */
var obj = {};
var obj2 = Object.create(null);
console.log(obj);
console.log(obj2)

/**
 * @description: 4. Object.create是ES5创建原型上属性和方法的，这是规范原型式继承的一个语言特性，参考红宝书ES5继承部分
 * @param {*}
 * @return {*}
 */
