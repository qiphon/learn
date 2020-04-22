var http = require("http");
var url = require("url");

function start(route) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        route(pathname, response)
    }

    http.createServer(onRequest).listen(8000);
    console.log("Server has started.");
}

exports.start = start;