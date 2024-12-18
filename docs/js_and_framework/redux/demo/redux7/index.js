import {createStore, combineReducers, applyMiddleware} from './redux/index.js'
import {counter, info, replaceReducer} from './reducers/index.js'
import { timeMiddleware, loggerMiddleware, exceptionMiddleware } from "./middlewares/index.js";
// let initState = {
//     counter: {
//         count: 0
//     },
//     info: {
//         name: 'qiphon',
//         description: 'frontend '
//     }
// }
const reducer = combineReducers({counter, info})
// let store = createStore(reducer, initState)

// // 添加middleware
// const next = store.dispatch
// const time = timeMiddleware(store)
// const log = loggerMiddleware(store)
// const exception = exceptionMiddleware(store)
// store.dispatch = exception(time(log(next)))

// 重写中间键
const rewriteMiddleware = applyMiddleware(
    exceptionMiddleware,
    timeMiddleware,
    loggerMiddleware
)

let store = createStore(reducer, {}, rewriteMiddleware)

// store.subscribe(()=>{ 
//     let state = store.getState()
//     console.log(state)
// })
// console.log(store.getState())
store.subscribe(()=>{ 
    let state = store.getState()
    console.log(state, '==============')
})

// store.changeState({
//     ...store.getState,
//     info: {
//         name: 'zhijia',
//         description: 'yd'
//     }
// })
let incrementBtn = document.getElementById('increase')
let decrementBtn = document.getElementById('decrease')
let replaceReducerBtn = document.getElementById('replaceReducer')

incrementBtn.onclick = ()=>{
    store.dispatch({type: 'INCREMENT'})
}
decrementBtn.onclick = ()=>{
    store.dispatch({type: 'DECREMENT'})
}
replaceReducerBtn.onclick = () => {
    store.replaceReducer(replaceReducer)
}
