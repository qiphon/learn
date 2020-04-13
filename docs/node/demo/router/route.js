function route(route, response){
    console.log('server is on' + route)
    if(route === '/'){
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.write("Hello World");
        response.end();
    }
    if(route === '/index/home'){
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.end(JSON.stringify({
            a: 123
        }))
    }
    response.end('404')
}

exports.route = route 