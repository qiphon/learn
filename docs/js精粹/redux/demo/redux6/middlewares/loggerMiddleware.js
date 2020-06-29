const loggerMiddleware = store => next => action => {
    console.log('logger间键', store.getState())
    console.log('------------')
    next(action)
}

export default loggerMiddleware