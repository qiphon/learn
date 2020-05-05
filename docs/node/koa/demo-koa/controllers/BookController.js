
const Books = require('@models/books')

class BookController {
    constructor(){

    }
    /**
     * @fileoverview 图书列表接口
     */
    async actionIndex(ctx, next){
        // let books = new Books()
        // let res = await books.getData()
        ctx.body = await ctx.render('index')
    }
    
}

module.exports = BookController