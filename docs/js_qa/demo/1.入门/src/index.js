var add = (a,b) => a + b;

var ps = (a,b)=> new Promise((resolve)=>{
    setTimeout(()=>resolve(a*b), 2000)
})

module.exports = {
    add,ps
}