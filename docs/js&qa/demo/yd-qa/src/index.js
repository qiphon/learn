const add = function(a){
    return a === 1 ?
            a + 1 : 
            a
}

// var ps = (a,b)=> new Promise((resolve)=>{
//     setTimeout(()=>resolve(a*b), 2000)
// })

module.exports = {
    add,
    // ps
}