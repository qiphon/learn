
/**
 * @fileoverview 图书列表类, 获取相关数据
 */
class Book {
    constructor(){

    }
    /**
     * @fileoverview  获取图书列表
     * @param  {object}  options  对应的筛选字段
     */
    getBookList(options){
        return Promise.resolve({
            data: [
                {
                    book: 'time management',
                    price: 56,
                    author: ''
                }
            ]
        })
    }
}

module.exports = Book