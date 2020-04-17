setTimeout(()=>console.log(1), 0)
setImmediate(()=>console.log(2))
process.nextTick(()=>console.log(3))
new Promise(resolve =>{
    console.log(4)
    resolve(5)
}).then(r => console.log(r))
console.log(6)