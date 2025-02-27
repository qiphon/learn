# [angular](https://angular.dev/overview)

使用 angular 时必须已经熟练使用

- js class
- typescript & typescript 装饰器

vscode angular 插件

```
Name: Angular Language Service
Id: Angular.ng-template
Description: Editor services for Angular templates
Version: 19.0.3
Publisher: Angular
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=Angular.ng-template
```

quick demo

```sh
mkdir test

cd test && npm init -y

npm i @angular/cli -D

npx ng new test_angular

#// 如果使用 vscode
code ./test_angular
```

angular 主要能力围绕以下内容

- [组件](./component.md)
- 模板
- 指令
- 依赖注入
- [响应数据api](./reactive.md)
