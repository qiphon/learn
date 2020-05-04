var express = require('express')
var app = express()

// 基础路由
// app.get('/', function (req, res) {
//     res.send('GET request to the homepage')
// })

// app.get(/.*fly$/, function (req, res) {
//     res.send('/.*fly$/')
// })

// // POST method route
// app.post('/', function (req, res) {
//     res.send('POST request to the homepage')
// })

// // 字段匹配
// app.get('/users/:userId/books/:bookId', function (req, res) {
//     res.send(req.params)
// })

// // Route path: /users/: userId / books /: bookId
// // Request URL: http://localhost:3000/users/34/books/8989
// // req.params: { "userId": "34", "bookId": "8989" }

// app.get('/flights/:from-:to', function (req, res) {
//     res.send(req.params)
// })
// // Route path: /flights/:from-:to
// // Request URL: http://localhost:3000/flights/LAX-SFO
// // req.params: { "from": "LAX", "to": "SFO" }

// app.get('/plantae/:genus.:species', function (req, res) {
//     res.send(req.params)
// })
// Route path: /plantae/:genus.:species
// Request URL: http://localhost:3000/plantae/Prunus.persica
// req.params: { "genus": "Prunus", "species": "persica" }

// 路由处理
// app.get('/example/b', function (req, res, next) {
//     console.log('the response will be sent by the next function ...')
//     next()
// }, function (req, res) {
//     res.send('Hello from B!')
// })
// var cb0 = function (req, res, next) {
//     console.log('CB0')
//     next()
// }

// var cb1 = function (req, res, next) {
//     console.log('CB1')
//     next()
// }

// var cb2 = function (req, res) {
//     res.send('Hello from C!')
// }

// app.get('/example/c', [cb0, cb1, cb2])

// // 也可以这样
// var cb0 = function (req, res, next) {
//     console.log('CB0')
//     next()
// }

// var cb1 = function (req, res, next) {
//     console.log('CB1')
//     next()
// }

// app.get('/example/d', [cb0, cb1], function (req, res, next) {
//     console.log('the response will be sent by the next function ...')
//     next()
// }, function (req, res) {
//     res.send('Hello from D!')
// })

// var router = express.Router()

// router.use(function timeLog(req, res, next) {
//     console.log('Time1: ', Date.now())
//     next()
// })
// // 相当于
// router.use('*', function timeLog(req, res, next) {
//     console.log('Time2: ', Date.now())
//     next()
// })
// // define the home page route
// router.get('/', function (req, res) {
//     res.send('Birds home page')
// })
// // define the about route
// router.get('/about', function (req, res) {
//     res.send('About birds')
// })

// app.use('/bird' ,router)
const swig = require('swig')
swig.setDefaults({ cache: false });
swig.setFilter(
    "reverseStr",
    require('./utils/myfilters').reverseStr
)
app.set('view engine', 'html')
app.engine('html', swig.renderFile)

app.use(express.static('public'))

app.get('/', (req, res, next)=>{
    // res.end('123')
    res.render('index', {
        title: 'swig home',
        people: [{ age: 23, name: 'Paul' }, { age: 26, name: 'Jane' }, { age: 23, name: 'Jim' }] ,
        span: '<span>111</span>'
    })
})

app.listen(3000)