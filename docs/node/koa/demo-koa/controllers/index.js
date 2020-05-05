const router = require('koa-simple-router')

const BookController = require('@controllers/BookController')
const bookController = new BookController()
const IndexController = require('@controllers/IndexController')
const indexController = new IndexController()

module.exports = app =>{
    app.use(router(_ => {
        _.get('/', indexController.actionIndex)
        _.get('/index.html', indexController.actionIndex)
        _.get('/books', bookController.actionIndex)
    }))
}
