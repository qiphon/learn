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
better-assert(TDD 断言库)
should.js，expect.js(BDD 断言库)

chai.js (TDD, BDD 双模)

Jasmine.js ( BDD )

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



#### 单元测试运行流程

1. before （单个测试用例，it 开始前）

2. beforeEach (每一个测试用例开始前)

3. it (定义测试用例，并利用断言库进行)

设置 chai 如：expect(x).to.equal(true)

异步mocha

4. after

5. afterEach 