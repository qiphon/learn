import {createStore} from './redux/index.js'
import reducer from './reducer.js'
let initState = {
    count: 0,
    info: {
        name: 'qiphon',
        description: 'frontend '
    }
}

let store = createStore(reducer, initState)

store.subscribe(()=>{ 
    let state = store.getState()
    console.log(state)
})

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