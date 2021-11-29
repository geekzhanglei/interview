let myAll = function (arr) {
    return new Promise((resolve, reject) => {
        const len = arr.length
        const list = new Array(len)
        let count = 0
        for (let i = 0; i < len; i++) {
            arr[i].then(res => {
                count++
                list[i] = res
                if (count === len) {
                    resolve(list)
                }
            }, err => {
                reject(err)
            })
        }
    })
}

let arr = [Promise.resolve(1), Promise.reject(3), Promise.resolve(2)]

myAll(arr).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})