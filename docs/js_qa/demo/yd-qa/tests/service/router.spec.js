const axios = require('axios')

describe('node 接口', function(){
    it('test 接口测试', function(done){
        axios.get('http://www.baidu.com')
        .then(function(res){
            if(res.data.xx == ''){
                done()
            }else{
                done(new Error('接口错误'))
            }
        }).catch(function(err){
            done(err)
        })
    })
})