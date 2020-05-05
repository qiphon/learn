/**
 * @fileoverview 获取图书数据， 操作图书
 */
class Books {
    constructor(app){
        this.app = app
    }
    /**
     * @fileoverview 获取图书列表数据
     * @author qifeng
     * @return {object} data
     */
    async getData(){
        return Promise.resolve({
            data: "数据请求成功"
        })
    }
}

module.exports = Books