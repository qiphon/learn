const timeMiddleware = store => next => action => {
    console.log('时间中间键', Date.now())
    console.log('------------')
    next(action)
}

export default timeMiddleware