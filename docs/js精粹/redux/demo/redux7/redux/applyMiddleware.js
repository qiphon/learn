import compose from "./compose.js";
export default function applyMiddleware(...middlewares){
    return function (oldCreateStore){
        return function newCreateStore(reducer, initState){
            const store = oldCreateStore(reducer, initState)
            const chain = middlewares.map(middleware => middleware(store))
            const dispatch = compose(...chain)(store.dispatch)
            return {
                ...store,
                dispatch,
            }
        } 
    }
}