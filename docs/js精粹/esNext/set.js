
const { GC , usedSize} = require('./gc')

GC()
usedSize()

let value = new Array(5* 1024 * 1024).fill(1)
const value2 = new Array(5* 1024 * 1024).fill(1)
const set1 = new Set()

set1.add(value)
set1.add(value2)

GC()
usedSize()
console.log(...set1)

value = null

GC()
usedSize()

console.log(...set1)
