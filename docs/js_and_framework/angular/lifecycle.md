# lifecycle

| Phase            | Method                | Summary                                                                                                                 |
| ---------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Creation         | constructor           | Standard JavaScript class constructor . Runs when Angular instantiates the component. 类初始化时执行，这里可以放 effect |
| Change Detection | ngOnInit              | Runs once after Angular has initialized all the component's inputs. 所有组件props初始化完成后执行                       |
|                  | ngOnChanges           | Runs every time the component's inputs have changed. props 变化时执行                                                   |
|                  | ngDoCheck             | Runs every time this component is checked for changes. 当组件 checked 状态变化时执行                                    |
|                  | ngAfterContentInit    | Runs once after the component's content has been initialized. 所有组件内容初始化完成后执行                              |
|                  | ngAfterContentChecked | Runs every time this component content has been checked for changes.                                                    |
|                  | ngAfterViewInit       | Runs once after the component's view has been initialized.                                                              |
|                  | ngAfterViewChecked    | Runs every time the component's view has been checked for changes.                                                      |
| Rendering        | afterNextRender       | Runs once the next time that all components have been rendered to the DOM.                                              |
| afterRender      | Runs                  | every time all components have been rendered to the DOM.                                                                |
| Destruction      | ngOnDestroy           | Runs once before the component is destroyed.                                                                            |
