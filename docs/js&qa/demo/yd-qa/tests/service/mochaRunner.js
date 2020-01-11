const Mocha =require('mocha')

const mocha = new Mocha({
    reporter: 'mochawesome',
    reporterOptions: {
        //这里有点问题，路径一直不生效
        // reportDir: './docs/service',
        // reportFilename: './service',
        // quiet: true
    }
})

mocha.addFile('./tests/service/router.spec.js')

mocha.run(function(){
    console.log('done !')
    process.exit()
})