//  测试 代码执行时间
function test (){
    console.log(22, arguments)
    return 'arguments'
}

Function.prototype.before = function(fn){
    var __self = this
    return function(){
        fn.apply(this, arguments)
        return __self.apply(this, arguments)
    }
}

Function.prototype.after = function(fn){
    var __self = this
    return function(){
        var result = __self.apply(__self, arguments)
        fn.apply(this, arguments)
        console.log(result, 'result')
        return result
    }
}


test
    .before(_=>{ 
        console.log('before', this)
    })
    .after(_=> {
        console.log('after', this)
    })(123)


