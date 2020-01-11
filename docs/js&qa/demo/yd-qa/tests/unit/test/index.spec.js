const {
    add, 
    // ps
} = require('../src/index')
// console.log(add, '========================')
describe("测试基本函数api", function(){
    it("+1 函数的应用", function(){
        expect(add(1)).toBe(2)
        // expect(add(1)).to.be(2)
    })
    // it('promise', function(){
    //     return ps(2,4).then(res=> expect(res).toEqual(8))
    // })
})