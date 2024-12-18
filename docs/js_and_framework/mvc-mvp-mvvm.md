# mvc mvp mvvm

## mvc 

m 数据层（数据查询）、v 视图层（数据展示）、c 控制器（逻辑处理）；

web1.0 时代 html模板开发 
web2.0 时代 ajax 盛行

mvc 模式业务逻辑主要在 controller，前端 view已经具备了处理用户事件的能力，当每个事件都流经 controller 时，这层变得非常臃肿。而且在 mvc 中view和controller时一一对应的，view+controller = 组件

```
mvc 模型                             view
                                   ↙     ↖
                                ↙           ↖
                            controller ---->  model
```

## mvp

mvc模式下view和model可以数据通信，mvp下完全分离了 view和model，
职责划分更明确。由于view不依赖model，可以将view抽成组件，只需提供接口来提供上层操作。

view和controller 通过 presenter 做数据交互，项目过大会导致 presenter 体积庞大，难以维护

1. 各部分之间的通信，都是双向的。

2. View 与 Model 不发生联系，都通过 Presenter 传递。

3. View 非常薄，不部署任何业务逻辑，称为"被动视图"（Passive View），即没有任何主动性，而 Presenter非常厚，所有逻辑都部署在那里。

```
mvp 模型

          controller <-------->  presenter <------> view

```


## mvvm

MVVM 模式将 Presenter 改名为 ViewModel，基本上与 MVP 模式完全一致。

唯一的区别是，它采用双向绑定（data-binding）：View的变动，自动反映在 ViewModel，反之亦然。Angular 和 Ember 都采用这种模式。

减少了大量人工的dom操作，可以更多的关注业务逻辑

```
mvvm 模型

        view  <-------> view model <------------->  model
                       dom listener 监听变化
                       directives 处理dom

```

## 总结

这三种模型是不同时代的产物，他们的思想都是做功能分层，减少耦合，便于后期维护
