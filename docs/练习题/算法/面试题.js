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
let tmp = []
function formatData(dataArr, obj) {
    obj = obj || {}
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