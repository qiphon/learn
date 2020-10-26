function dfReactive(data, key, value){
  Object.defineProperty(data, key, {
    get (){
      console.log(`get key:  ${key} value: ${value}`)
      return value
    },
    set (newVal){
      console.log(`set key: ${key} value: ${newVal}`)
      value = newVal
    }
  })
}

function observe(data){
  Object.keys(data).forEach((key)=> {
    dfReactive(data, key, data[key])
  })
}

var arr = [1,2,3,4]
observe(arr)

// arr.push(33)
// 5
// arr.unshift(11)
// object.defineProperty:4 get key:  3 value: 4
// object.defineProperty:4 get key:  2 value: 3
// object.defineProperty:8 set key: 3 value: 3
// object.defineProperty:4 get key:  1 value: 2
// object.defineProperty:8 set key: 2 value: 2
// object.defineProperty:4 get key:  0 value: 1
// object.defineProperty:8 set key: 1 value: 1
// object.defineProperty:8 set key: 0 value: 11