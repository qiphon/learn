
// 
// function solution(A) {
//   // Implement your solution here
//   let map = {}
//   let max = 1

//   const getSmaller = (max) => {
//       let upper = max + 1
//       while(map[upper]) {
//           upper++
//       }
//       return upper
//   }

//   A.forEach(num => {
//       map[num]=1
//       if(max === num ){
//         max =  getSmaller(max)
//       } 
//   })
//   return max 
// }

// console.log(solution([1, 3, 6, 4, 1, 2]))

const getRandomArray = (arr) => {
  let result = []
  let leftData = [...arr]
  if (arr.length <= 1) return arr
  while (leftData.length) {
    const len = leftData.length
    if (len <= 1) {
      result = result.concat(leftData)
      leftData = []
    } else {

      const index = Math.floor(Math.random() * len)
      result = result.concat(leftData[index])
      leftData.splice(index, 1)
    }
  }
  return result
}

// console.log(getRandomArray([1,2,3,4,5,6,7]))

const a = {
  'america': 'newyork',
  china: 'beijing',
  cra: 'shouer',
}

let a2 = Object.entries(a)
console.log(
  a2
)
let s = a2.flat()
console.log(s)

const getTableTd = () => {
  const tables = document.getElementsByTagName('table')

  let re = 0
  tables.forEach(item => {
    let r = item.getElementsByTagName('td').length
    if (r > re) {
      re = r
    }
  });
  return re
} 