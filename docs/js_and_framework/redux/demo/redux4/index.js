import {createStore, combineReducers} from './redux/index.js'
import {counter, info} from './reducers/index.js'
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
let store = createStore(reducer)

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

incrementBtn.onclick = ()=>{
    store.dispatch({type: 'INCREMENT'})
}
decrementBtn.onclick = ()=>{
    store.dispatch({type: 'DECREMENT'})
}