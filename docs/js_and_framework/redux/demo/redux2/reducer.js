export default function reducer(state, action){
    switch(action.type){
        case 'INCREMENT': 
            // redux 的状态不可被改变， reducer 出来的
            return {
                ...state,
                count: state.count + 1
            }
        case 'DECREMENT':
            return {
                ...state, 
                count: state.count - 1
            }
        default: 
            return state
    }
}