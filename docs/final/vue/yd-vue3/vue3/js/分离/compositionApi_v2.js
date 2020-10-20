// scope实现逻辑抽取
const scopeComp = Vue.component("scope-comp", {
  template: `
        <div>
            // 暴露逻辑的数据给子组件
            <slot :data="data"></slot>
        </div> 
    `,
  // 一些代码逻辑完成的在option选项中，data,methods,computed等等
  data: () => ({
    data: "",
  }),
});

new Vue({
  el: "#app",
  components: {
    "scope-comp": scopeComp,
  },
  template: `
        <div>
            // 传入未排序的数据unSortdata
            <scope-comp data="unSortdata">
                <template v-slot="sortData">
                    // 使用经过处理后的sortData数据
                </template>
            </scope-comp>
        </div>
    `,
  data: {
    unSortdata: [],
  },
});


/* 
    存在一些缺点
        增加缩进。一两个时没多大影响，但过多时使可读性变差。
        一般需要增加配置，不灵活。需要在slot上增加配置，以应对更多的情况。
        性能差。仅为了抽取逻辑，需要创建维护一个组件实例。
*/
