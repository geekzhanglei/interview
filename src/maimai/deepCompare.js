/*
 * @Author: zhanglei
 * @Date: 2021-11-25 12:34:54
 * @LastEditors: zhanglei
 * @LastEditTime: 2021-11-25 12:36:05
 * @Description: 深度比较
 */
function compare(a, b) {
    const typeA = {}.toString.call(a);
    const typeB = {}.toString.call(b);
    if (typeA !== typeB) return false;
    let result = false;
    switch (typeA) {
        case '[object Undefined]':
        case '[object Null]':
            result = true;
            break;
        case '[object String]':
        case '[object Number]':
            if (a === b) result = true;
            break;
        case '[object Array]':
            if (a.length === b.length) {
                result = a.every(aitem => b.some(bitem => compare(aitem, bitem)));
            }
            break;
        case '[object Object]':
            const keysA = Object.keys(a);
            const keysB = Object.keys(b);
            if (keysA.length === keysB.length) {
                result = keysA.every((key) => {
                    if (b.hasOwnProperty(key)) {
                        return compare(a[key], b[key]);
                    }
                    return false;
                });
            }
            break;
    }
    return result;
}
