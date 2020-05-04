var express = require('express')
var app = express()

// app.use((req, res, next)=>{
//     console.log( res,'before')
//     req.abc = '111req abc'
//     // next('aaa')
// })

app.get('/', (req, res, next)=>{
    // res.status(500)
    // s
    res.send('123')
    // next(11)
})


app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

function logErrors(err, req, res, next) {
    console.log('记录日志', err.stack)
    next(err)
}
function clientErrorHandler(err, req, res, next) {
    console.log('----------------clientErrorHandler=================')
    if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' })
    } else {
        next(err)
    }
}
function errorHandler(err, req, res, next) {
    console.log('errorHandler===================')
    res.status(500)
    // next(err)
    res.send('something is wrong')
}


app.listen(8081, ()=>{
    console.log('===================server start')
})