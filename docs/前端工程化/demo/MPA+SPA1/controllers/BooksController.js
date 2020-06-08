const Book = require('@models/book')

class BookController {
    constructor(){

    }
    async actionIndex(ctx, next){
        const book = new Book()
        ctx.body = await book.getBookList()
        // ctx.body = {
        //     data: '图书列表页'
        // }
    }
}

module.exports = BookController