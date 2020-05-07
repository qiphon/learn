const hello = {
    method: "GET",
    options:{
        tags: ['api']
    },
    path: '/hello/{name}',
    handler(req, h){
        return `hello ${encodeURIComponent(req.params.name)}`
    }
}
const index = {
    method: "GET",
    path: '/',
    options:{
        tags: ['api', 'home']
    },
    handler(req, h){
        return {
            data: 'hello hapi'
        }
    }
}

module.exports = [hello, index]