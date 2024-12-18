// describe + it(很多) 完成测试用例
// 断言库
describe("第一个单元测试", function(){
    it('测试 + 1 函数', function(){
        expect( add(1) ).toBe(21)
        expect(add(5)).toBe(6)
    })
})