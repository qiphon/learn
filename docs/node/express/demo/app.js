const express = require("express")

const app = express()
// 设置静态文件目录
app.use(express.static('public'))

// 设置模板引擎
const swig = require('swig')
// 开发时关闭缓存，不然样式改动会看不出来
swig.setDefaults({ cache: false });
app.set('view engine', 'html')
app.engine('html', swig.renderFile)

// 处理post数据
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extende: true }));
app.use(bodyParser.json())

app.get('/', (req, res, next) => {
    // res.end('home')
    res.render('index')
})

// 数据操作
const mysql = require('./model/index')
// 接收表单请求
app.post('/', (req, res, next) => {
    // console.log(req.query)
    // console.log(req.body, mysql)
    mysql.setUser(req.body, function (err) {
        if (err) {
            console.log(err)
            res.json({
                status: 500,
                msg: '插入失败'
            })
        }
        else {
            res.json({
                status: 200,
                msg: '插入成功'
            })
        }
    })
})

/**
 * @fileoverview 未知路由的容错
 */
app.use('*', (req, res, next) => {
    res.status(404)
    res.end("<h1>404")
})

// 代码错误的容错处理
app.use([ErrorHandler])

function ErrorHandler(err, req, res, next) {
    res.status(500)
    res.end('server error')
}

app.listen(3000, () => {
    console.log('server is start at 3000...')
})