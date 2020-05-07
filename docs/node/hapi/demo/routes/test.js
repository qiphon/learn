const path = require('path')
const test = {
    method: "GET",
    path: '/test',
    options: {
        tags: ['api'],
    },
    handler(req, h){
        // req.logger.info('In handler %s', req.path);
        return h.file(path.join(__dirname, '../public/test.html'))
    }
}

module.exports = [test]