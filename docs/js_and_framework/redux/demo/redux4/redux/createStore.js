
export default function createStore (reducer, initState){
    let state = initState
    let listeners = []
    function subscribe(listener){
        listeners.push(listener)
    }
    function getState(){
        return state
    }
    function dispatch(action){
        state = reducer(state, action)
        for(let i =0; i< listeners.length; i++){
            const listener = listeners[i]
            listener()
        }
    }
    // function changeState(newState){
    //     state = newState
    //     for(let i =0; i< listeners.length; i++){
    //         const listener = listeners[i]
    //         listener()
    //     }
    // }
    // 初始化状态，保证在没有出入初始state的时候代码报错
    dispatch({type: Symbol('init')})
    return {
        subscribe,
        getState,
        // changeState,
        dispatch
    }
}