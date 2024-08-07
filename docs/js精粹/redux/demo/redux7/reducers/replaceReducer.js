let initState = {
    name: 'replace reducer',
    description: 'reducer is replaced '
}

export default function replaceReducer(state, action){
    console.log(action,'replace reducer')
    if(!state) state = initState;
    switch(action.type){
        case 'SET_NAME': 
            // redux 的状态不可被改变， reducer 出来的
            return {
                ...state,
                name: action.name
            }
        case 'SET_DESC':
            return {
                ...state, 
                description: action.description
            }
        default: 
            return state = initState
    }
}