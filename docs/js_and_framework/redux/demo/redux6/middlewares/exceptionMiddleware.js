const exceptionMiddleware = store => next => action => {
    try{
        console.log('exception间键', store.getState())
        console.log('------------')
        next(action)
    }
    catch (err){
        console.log('错误信息：',err)
    }
}

export default exceptionMiddleware