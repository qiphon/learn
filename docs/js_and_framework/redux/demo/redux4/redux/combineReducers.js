export default function combineReducers(reducers){
    const reducersKeys = Object.keys(reducers)
    return function combineaction (state={}, action){
        // console.log('reducer', state, reducersKeys)
        const nextState = {}
        for(let i=0; i<reducersKeys.length; i++){
            const key = reducersKeys[i]
            const reducer = reducers[key]
            console.log('--state', state[key])
            console.log('--action', action)

            // 取出之前的key 对应的state
            const preStateKey = state[key]
            // 执行reducer 
            const nextStateKey = reducer(preStateKey, action)
            nextState[key] = nextStateKey
        }
        return nextState
    }
}