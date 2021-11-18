/*
 * @Author: zhanglei
 * @Date: 2021-11-17 18:29:27
 * @LastEditors: zhanglei
 * @LastEditTime: 2021-11-17 23:33:53
 * @Description: ts写array转换为树状结构
 */
// 输入对象
// list =[
//      {id:1,name:'A',parentId:0},
//      {id:2,name:'B',parentId:0},
//      {id:3,name:'C',parentId:1},
//      {id:4,name:'D',parentId:1},
//      {id:5,name:'E',parentId:2},
//      {id:6,name:'F',parentId:3},
//      {id:7,name:'G',parentId:2},
//      {id:8,name:'H',parentId:4}
// ];

// 输出结果
// result = [
//      {
//        id: 1,
//        name: 'A',
//        parentId: 0,
//        children: [
//          {
//            id: 3,
//            name: 'C',
//            parentId: 1,
//            children: [
//              {
//                id: 6,
//                name: 'F',
//                parentId: 3
//              }, {
//                id: 16,
//                name: 'L',
//                parentId: 3
//              }
//            ]
//          },
//          {
//            id: 4,
//            name: '部门D',
//            parentId: 1,
//            children: [
//              {
//                id: 8,
//                name: 'H',
//                parentId: 4
//              }
//            ]
//          }
//        ]
//      },
//    ···
//  ];
interface Item {
    id: number,
    name: string,
    parentId: number,
}

interface Result {
    id: number
    name: string
    parentId: number
    children?: Result[]
}
// 利用了引用类型地址不变的特性
function convert(list: Item[]): Result[] {
    let arr = []
    let obj = list.reduce((res, v) => (res[v.id] = v, res), {})
    for (let item of list) {
        if (item.parentId == 0) {
            arr.push(item)
            continue
        }
        let parent = obj[item.parentId]
        parent.children = parent.children || []
        parent.children.push(item)
    }
    return arr
}