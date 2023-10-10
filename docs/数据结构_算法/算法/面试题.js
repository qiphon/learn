// 我做过的面试题

var industry_list = [
    {
        "parent_ind": "女装",
        "name": "连衣裙"
    },
    {
        "name": "女装"
    },
    {
        "parent_ind": "女装",
        "name": "半身裙"
    },
    {
        "parent_ind": "女装",
        "name": "A字裙"
    },
    {
        "name": "数码"
    },
    {
        "parent_ind": "数码",
        "name": "电脑配件"
    },
    {
        "parent_ind": "电脑配件",
        "name": "内存"
    },
    {
        parent_ind: '内存',
        name: 'ks'
    }
]
/** 
 * 输入上面的值，得到如下结果
 * {
  "数码": {
    "电脑配件": {
        "内存" : {}
     }
  },
  "女装" : {
     "连衣裙": {},
    "半身裙": {},
    "A字裙": {}
  }
}
*/
function formatData(dataArr) {
    let tmp = []
    let obj = {}
    dataArr.forEach(item => {
        if (!item.parent_ind) {
            obj[item.name] = {}
        } else {
            tmp.push(item)
        }
    })
    let objEntry = Object.entries(obj)
    if (objEntry.length && tmp.length) {
        arrDeal([obj], tmp)
    }
    return obj
}
function arrDeal(objArr, tmp){
    let newArr = []
    objArr.forEach(obj=>{
        // console.log(obj)
        let objEntry = Object.entries(obj)
        objEntry.forEach(([name])=>{
            let arr = tmp.filter(it => it.parent_ind === name)
            arr.forEach(it=>{
                obj[name][it.name] = {}
            })
            newArr.push(obj[name])
            tmp = tmp.filter(it => it.parent_ind !== name)
        })
    })
    if (newArr.length && tmp.length) {
        arrDeal(newArr, tmp)
    }
}
console.log(formatData(industry_list), 'end')


// 错的很丢人的题

p = new Promise((r)=>{
    console.log(new Date(), 'start')
    var c = new Promise(r=>{
        setTimeout(()=>{
            console.log(new Date(), 'c')
            r(12)
        }, 5000)
    })
    setTimeout(_=>{
        console.log(new Date(), 'rr')
        r(c)
    },2000)
//     r()
}).then(r=>{
    console.log(r, new Date());
})
// VM7424:2 Thu Jul 02 2020 16:03:32 GMT+0800 (中国标准时间) "start"
// Promise {<pending>}
// VM7424:10 Thu Jul 02 2020 16:03:34 GMT+0800 (中国标准时间) "rr"
// VM7424:5 Thu Jul 02 2020 16:03:37 GMT+0800 (中国标准时间) "c"
// VM7424:15 12 Thu Jul 02 2020 16:03:37 GMT+0800 (中国标准时间)

// 另一个很丢人的题

class a {
    say(){
        console.log(this)
    }
}

// a.prototype
// {constructor: ƒ, say: ƒ}
// constructor: class a
// say: ƒ say()
// __proto__: Object