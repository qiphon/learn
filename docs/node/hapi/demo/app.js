const Hapi = require('@hapi/hapi');
const routes = require('./routes')
const HapiSwagger = require('hapi-swagger');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');


const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });
    await server.register([
        // {
        //     plugin: require('hapi-pino'),
        //     options: {
        //         prettyPrint: true,
        //         logEvents: ['response', 'onPostStart']
        //     }
        // },
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: {
                info: {
                    title: 'Test API Documentation',
                    // version: Pack.version,
                },
            }
        }
    ]);
    // console.log('==================', routes)
    server.route(routes)
    // server.route({
    //     method: 'GET',
    //     path: '/',
    //     handler: (request, h) => {
    //         return 'Hello World!';
    //     }
    // });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

// 捕获错误
process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();