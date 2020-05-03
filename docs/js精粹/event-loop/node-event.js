// setTimeout(_ => console.log('timeout'))
// setImmediate(_ => console.log('immediate'))

// qiphon@qiphon:/media/qiphon/新加卷/qiphon/mygit/yd-learn/docs/js精粹/event-loop$ node node-event.js 
// immediate
// timeout
// qiphon@qiphon:/media/qiphon/新加卷/qiphon/mygit/yd-learn/docs/js精粹/event-loop$ node node-event.js 
// timeout
// immediate

// var fs = require('fs')
// fs.readFile('./event-loop.md', function(){
//     setTimeout(_=>console.log("timeout"))
//     setImmediate(_=>console.log("immediate"))
// })
// immediate
// timeout

// setImmediate(()=>{
//     console.log('immediate')
// })
// process.nextTick(()=>{
//     console.log('nextTick')
// })
// nextTick
// immediate

// setTimeout(()=>{
//     console.log('timer1')
//     Promise.resolve().then(_=> console.log('promise1'))
// })
// setTimeout(()=>{
//     console.log('timer2')
//     Promise.resolve().then(_=> console.log('promise2'))
// })


// setImmediate(()=>console.log('immediate1'))
// setImmediate(()=>{
//     console.log('immediate2')
//     Promise.resolve().then(_=>console.log('promise'))
// })
// setImmediate(()=>console.log('immediate3'))
// setImmediate(()=>console.log('immediate4'))



// setImmediate(()=>console.log('immediate1'))
// setImmediate(()=>{
//     console.log('immediate2')
//     process.nextTick(_=>console.log('nextTick'))
// })
// setImmediate(()=>console.log('immediate3'))
// setImmediate(()=>console.log('immediate4'))