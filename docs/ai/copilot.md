# github copilot

### 安装

```
Name: GitHub Copilot
Id: GitHub.copilot
Description: Your AI pair programmer
Version: 1.254.0
Publisher: GitHub
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=GitHub.copilot
```

```
Name: GitHub Copilot Chat
Id: GitHub.copilot-chat
Description: AI chat features powered by Copilot
Version: 0.23.2
Publisher: GitHub
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat
```

目前已经免费，安装后使用 github 登录即可使用

### GitHub Copilot 可以帮助你完成以下任务：（copilot 生成）

- 代码补全：在你编写代码时，Copilot 会根据上下文提供智能代码补全建议。
- 代码生成：根据你的注释或函数名称，生成相应的代码片段。
- 代码解释：解释当前编辑器中的代码如何工作。
- 单元测试生成：为选定的代码生成单元测试。
- 代码修复：提出解决选定代码中问题的建议。
- 项目搭建：在工作区中为新文件或项目搭建代码框架。
- Jupyter Notebook 创建：创建一个新的 Jupyter Notebook。
- 测试失败修复：提出解决测试失败的建议。
- 测试设置：在项目中设置测试（实验性功能）。
- VS Code 问题解答：询问有关 VS Code 的问题。
- 工作区搜索：生成工作区搜索的查询参数。
- 调试配置：生成启动配置并在 VS Code 中开始调试（实验性功能）。
- 终端操作：询问如何在终端中执行某些操作。
- 终端解释：解释在终端中的某些内容。
- 网络搜索：获取基于网络搜索、代码搜索和企业知识库的答案。

## 使用

- 快捷键 cmd + i 可以直接向 copilot 提问
- 在代码文件中写一个注释，同样会出现 copilot 提示代码

  - 按 tab 键可以直接使用
  - cmd ➕ 方向键可以部分使用

- 在 chat 输入框中输入 `/` copilot 可以其他的任务（以下是 copilot 自动填充的功能说明）
  - @workspace 询问有关您的工作区的信息
  - /explain - 解释活动编辑器中的代码如何工作
  - /tests - 为选定的代码生成单元测试
  - /fix - 提出解决选定代码中问题的建议
  - /new - 在工作区中为新文件或项目搭建代码框架
  - /newNotebook - 创建一个新的 Jupyter Notebook
  - /fixTestFailure - 提出解决测试失败的建议
  - /setupTests - 在项目中设置测试（实验性功能）
  - @vscode - 询问有关 VS Code 的问题
  - /search - 生成工作区搜索的查询参数
  - /startDebugging - 生成启动配置并在 VS Code 中开始调试（实验性功能）
  - @terminal - 询问如何在终端中执行某些操作
  - /explain - 解释在终端中的某些内容
  - @github - 获取基于网络搜索、代码搜索和企业知识库的答案

## 隐私设置

vscode 顶部 copilot 图标旁边的下拉框，选择 manage copilot setting (会打开页面 https://aka.ms/github-copilot-settings)

主要修改有 2 处

- Allow GitHub to use my data for product improvements
- Allow GitHub to use my data for AI model training

同时我们可以开启 bing 搜索和 claude 3.5 模型

- Copilot access to Bing
- Anthropic Claude 3.5 Sonnet in Copilot

修改设置要 30 分钟才能生效，并且要重启代码编辑器 （copilot 回复）
