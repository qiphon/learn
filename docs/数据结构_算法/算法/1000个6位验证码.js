// function genNumCode(len, num){
//     let arr = new Array(num)
//     while(num --){
//         arr[num] = genNum(len)
//     }
//     return arr
// }
// function genNum(len){
//     const base = 10**len
//     let a = ~~(Math.random() * base )
//     while(a < base/10 -1){
//         a = ~~(Math.random() * base )
//     }
//     return a
// }

// let r = genNumCode(6, 1000)
// console.log(r)

// console.log(new Array(1000).fill(0).map(() => (Math.random()+'').slice(2,8).padEnd(6,Math.random()* 10**6)))

console.log(Array.from({length: 1000}, ()=> `${Math.random()*1e6 >>> 1}`.padStart(6, '0')))