var html = ('<h1>module is not surport !!')

console.dir(document.documentElement)
console.dir(document.getElementsByTagName('body'))
console.dir(document.querySelector)
// alert(123)

window.onload = function(){
    document.body.innerHTML= html
}