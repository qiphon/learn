function bindActionCreator(actionCreator, dispatch){
    return function(){
        return dispatch(actionCreator.apply(this, arguments))
    }
}

function bindActionCreators(actionCreators, dispatch){
    if(typeof actionCreators === 'function'){
        return bindActionCreator()
    }
    if(typeof actionCreators !== 'object' || actionCreators === null){
        throw new Error("actioncreators 类型错误")
    }
    const keys = Object.keys(actionCreators)
    let action = {}
    for(let i=0; i< keys.length; i++){
        let key = keys[i]
        let actionCreator = actionCreators[key]
        if( typeof actionCreator === 'function'){
            action[key] = bindActionCreator(actionCreator, dispatch)
        }
    }
    return action;
}

export default bindActionCreators