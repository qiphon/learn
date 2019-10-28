// describe 是一个用例组
describe('测试 函数', function () {
    // it表示的是一个用例
    it('常规输入', function () {
        expect(add(2, 3)).toBe(5)
    })

    it('promise', function () {
        // return ps(2, 5).then(res=> expect(res).toBe(10) )
        return ps(2, 4).then(res => expect(res).toEqual(8))
    })

})

// describe('异步函数测试', function(){
//     it('promise', function(){
//         // return ps(2, 5).then(res=> expect(res).toBe(10) )
//         return ps(2,4).then(res=> expect(res).toEqual(8))
//     })
// })