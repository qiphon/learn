import {createStore} from './redux/index.js'

let initState = {
    count: 0,
    info: {
        name: 'qiphon',
        description: 'frontend '
    }
}

let store = createStore(initState)

store.subscribe(()=>{ 
    let state = store.getState()
    console.log(state)
})

store.subscribe(()=>{ 
    let state = store.getState()
    console.log(state, '==============')
})

store.changeState({
    ...store.getState,
    info: {
        name: 'zhijia',
        description: 'yd'
    }
})