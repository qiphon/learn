# js & QA

1. 单元测试

> 保证自己代码产出的东西是符合预期的
- 目的：让开发者明确知道代码的结果

- 原则：单一职责、接口抽象、层次分离

- 断言库：保证最小单元是否正常运行检测方法

- 测试风格：测试驱动开发（Test-Driven Development, TDD）、行为驱动开发(Behavior Diven Development)均是敏捷开发方法论

1.1 TDD关注所有的功能是否被实现（每个功能都必须有对应的测试用例），suite 配合 test 利用 assert ('tobi' == user.name)

1.2 BDD 关注整体行为是否符合预期，编写的每一行代码都有目的提供一个全面的测试用例集。  should,describe 配合it 利用自然语言 expect(1).toEqual(fn())

单元测试框架

- better-assert(TDD 断言库)

- should.js，expect.js(BDD 断言库)

- chai.js (TDD, BDD 双模)

- Jasmine.js ( BDD )

- Node本身集成 require("assert")

- Intern 更是一个大而全的单元测试框架

- QUnit 一个游离在 jquery 左右的测试框架

- Macaca 一套完整的自动化测试解决方案  国产神器，来自阿里

2. 性能测试

> 保证代码可靠性

### 基准测试

- 面向切面编程AOP无侵入式统计

- Benchmark 基准测试方法，它并不是简单地统计执行多少次测试代码后对比时间，它对测试有着严密的抽样过程。执行多少次取决于采样到的数据能否完成统计。根据统计次数计算方差。

### 压力测试

- 对网络接口压力测试需要检查的几个常用指标有 吞吐率、响应时间和并发数，这些指标反映了服务器并发处理能力

- PV 网站当日访问人数 UV独立访问人数。PV 每天几十万甚至上百万就需要考虑压力测试。换算公式 QPS = PV / t  
ps: 1,000,000 / 10 * 60 * 60 = 27 (100 万请求集中在10个小时，服务器每秒处理 27.7个业务请求)

- 常用的压力测试工具 ab \ siege \ http_load

- ab -c 100 -n 100 http://localhost  每秒持续发出28个请求 Request per second 表示服务器每秒处理的请求数 QPS

3. 安全测试

- XSS

- SQL

- CSRF

4. 功能测试

用户真实性检查

- selenium-webdriver (检测)

- protractor selenium-standalone  （log）

- http://webdriver.io  WEBDRIVER I/O

1. 冒烟测试 Smoke Test 自由测试的一种，找到一个BUG 开发修复，然后专门针对此bug。 有点是节省时间，防止build失败，缺点是覆盖率极低

2. 回归测试 修改一处对整体功能全部测试，一般配合自动化测试

3. js lint&Hint

> 目的： 检测js代码标准
原因：js代码诡异，保证团队代码规范
lint : http://www.jslint.com
hint: http://www.jshint.com
搭配自动化任务管理工具完善自动化测试 grunt-jshint\grunt-jslint

## 测试分层

1. 单元测试

单元测试确保基础单元（比如组件、类、函数）没有问题

2. 集成测试

确保不同的组建合在一起没有问题

3. 自动化e2e测试

即完全作为一个用户一样，将程序作为一个完全的黑盒，打开应用程序模拟输入，检查功能与界面是否正确

### 为什么要使用单元测试

- 正确性：测试可以验证代码的正确性，在上线前做到心里有底

- 自动化：当然，手工也可以测试，通过console可以打印内部信息，但是这是一次性的事情，下次测试还要从头进行，效率不能得到保障。通过编写测试用例，可以做到一次编写多次运行

- 解释性：测试用例用于测试接口、模块的重要性，那么在测试用例中就会涉及如何使用这些api。其他开发人员如果要使用这些api，那么阅读测试用例是一种很好的途径，有时比写文档说明更清晰

- 驱动开发，指导设计：代码被测试的前提是代码本身的可测试性，那么要保证代码的可测试性，就要在开发中注意api的设计，TDD 将测试前移就是起到这么一个作用、

- 保证重构：互联网行业产品迭代很快，迭代后必然存在代码重构过程，那怎么才能保证重构代码的质量呢？有测试用例做后盾，就可以大胆的重构

### 单元测试运行流程

- 确定测试平台，代码运行环境等（比如 node、 chrome）

- 选择框架，mocha, jasmine, jest, ava,辅助的断言库有 （chai）、测试桩（Sinon, testDouble）

- 查看测试结果，主要是测试覆盖率

1. before （单个测试用例，it 开始前）

2. beforeEach (每一个测试用例开始前)

3. it (定义测试用例，并利用断言库进行)

设置 chai 如：expect(x).to.equal(true)

异步mocha

4. after

5. afterEach 