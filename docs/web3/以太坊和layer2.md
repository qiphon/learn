# 以太坊和 layer2

#### Rollup 技术原理

Rollup 是一种将多个交易打包成一个区块的技术，从而减少区块大小和交易确认时间。Rollup 的核心思想是将多个交易打包成一个区块，而不是将每个交易都打包成一个单独的区块。这样可以减少区块大小和交易确认时间，提高区块链的交易效率。

### Optmistic Rollup 和 ZK Rollups

optimistic rollup 是一种基于以太坊的 Rollup 技术，它通过将交易打包成一个区块的方式来减少区块大小和交易确认时间。Optimistic rollup 的核心思想是使用以太坊的智能合约来验证交易，而不是使用以太坊的区块来验证交易。这样可以减少区块大小和交易确认时间，提高区块链的交易效率。

ZK Rollups 是一种基于以太坊的 Rollup 技术，它通过使用零知识证明来验证交易，而不是使用以太坊的智能合约来验证交易。ZK Rollups 的核心思想是使用零知识证明来验证交易，而不是使用以太坊的智能合约来验证交易。这样可以减少区块大小和交易确认时间，提高区块链的交易效率。

#### optimistic rollup

Optimiam

- 乐观的认为 Rollup 发布到以太坊主网的数据是正确的
- 引入了争议时间延迟机制（Dispute Time Delay , DTD ） （通过挑战、被挑战双方提交保证金，错误的一方罚没，根据结果确定是否回滚交易）
- 使用挑战期保护数据的正确性

优点

- 技术成熟易于实现

缺点

- 挑战时间过长，用户体验差
- 要求社区里有足够多的挑战者来验证 Roolup 区块的合法性并且能在挑战期结束前及时提交欺诈证明

#### Arbitrum

多轮交互式欺诈证明，挑战者提出证明，asserter不断把挑战点拆分，直到拆分成不能再分范围。在线下执行，链上去判定，降低链上争议的成本，所需的挑战期更长

### ZK Rollups

- 利用零知识证明（ZKP， zero-knowledge proof）来验证交易（上链前验证交易），而不是使用以太坊的智能合约来验证交易。保证交易的有效性。
- zk rollup 的安全性依赖于密码学原理，它的一个主要有点在于不需要挑战期。
- 目前 zk rollup 通用计算能力较差。

#### 概念

- 零知识证明是指一方（证明者）想另一方（验证者）证明一个陈述是正确的，而无需透露除述之外的任何信息。

  - 证明者（prover）：负责计算交易并把这些交易聚合成零知识证明
  - 验证者（verifier）：负责验证零知识证明，并确保交易是正确的。

- 零知识证明的数学基础是同态加密

#### zk-SNARK: Zero-knowledge Succinct Non-interactive Argument of Knowledge

非交互性：证明者向验证者一次性发送一个消息，2 者无需进行交互

简洁性：验证速度快，存储空间小

证明者需要的工作量比较大。验证只需要几毫秒。

### zk-SNARK 区块链中的应用

#### Zcash

Zcash 利用 zk-SNARK ，保护链上的交易具体信息（输入地址、输出地址、交易金额等）。

Zcash 是 zk-SNARK 的第一个广泛的应用

#### Filecoin

Filecoin 利用 zk-SNARK, 完成复制证明（PoRep）以及时空证明（PoSt）

- 复制证明： 初次完成存储交易，验证存储提供者存储了数据
- 时空证明：随着时间推移，证明存储者提供者依然持续存储原始数据

Filecoin 是迄今为止部署的最大的 zk-SNARK 网络

### zk rollup 代表项目

#### zkSync

- 基于 zk-SNARK 实现
- 安全性依赖于初始化信任设置（Multi-party computation ceremony）
- EVM 兼容,可把智能合约转换操作码来实现 Solidity 兼容

数据可用性方面

- zkSync 提供了 2 种数据可用性方案：链上存储 与 链下存储
- 链上存储： 安全性高、需要支付一定的 Gas 费
- 链下存储： 支付少量 Gas 费，牺牲一定的去中心化和安全性

#### STARKWARE

- StarkWare 基于 zk-STARK 技术, 全称 Scalable Transparent Arguments of Knowledge
- 相比 zk-SNARK，zk-STARK 具有以下优势
  - 透明性（transparency）：zk-STARK 无需信任设置
  - 扩展性（scalability）：zk-STARK 降低了计算复杂度，生成证明速度更快
  - 抗量子攻击： ZK-STARK 使用抗冲突的哈希函数提高了抵御量子攻击的能力
- zk-STARK 缺点在于技术成熟度、普及度低，社区、生态发展还处于起步阶段
- 另一个缺点 EVM 兼容性差，为此设计了编程语言 Cairo 。`Cairo 编写 -> 智能合约 -> 特定的记录 -> STARK 验证`

StarkWare 数据可用性

Volition: 允许用户采取链上的 rollup 方案，或者链下的 validium 方案。

链下数据的可用性是由一个中心化的“数据可用性委员会” 提供安全保证

#### Polygon

- 采用 Plasma
- 资金退出异常复杂
- 不兼容 DeFi 智能合约
- 扩容方案各有优劣
- 希望各种 layer 2 解决方案百花齐放
- 流动性割裂

提供多种 layer 2 方案，社区比较好
