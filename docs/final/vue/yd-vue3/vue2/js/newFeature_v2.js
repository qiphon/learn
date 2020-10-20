/* 
    1.Vue全局变量
    import Vue from 'vue'
    import App from './App.vue'

    Vue.config.ignoredElements = [/^app-/]
    Vue.use()
    Vue.mixin()
    Vue.component()
    Vue.directive()

    new Vue({
    render: h => h(App)
    }).$mount('#app')

*/

/* 
    2.自定义指令
    const MyDirective = {
        bind(el, binding, vnode, prevVnode) {},
        inserted() {},
        update() {},
        componentUpdated() {},
        unbind() {}
    }
*/
const MyDirective = {
  bind(el, binding, vnode, prevVnode) {
    console.log(el); //  <div>自定义指令</div>
  },
  inserted() {},
  update() {},
  componentUpdated() {},
  unbind() {},
};
new Vue({
  el: "#app",
  directives: { MyDirective },
  template: `
        <div v-MyDirective>自定义指令</div>
    `,
});

/* 
    3.v-model双向绑定
    在 Vue2.3.0 新增了 .sync 修饰符。
    父组件调用子组件 text-document 时，子组件就可以修改父组件的 doc.title。
    <text-document v-bind:title.sync="doc.title"></text-document>
*/

/* 
    4.根节点
*/

/* 
    5.Suspense Template Fallback 组件
    
*/
new Vue({
  el: "#app1",
  template: `
          <div>
            <div v-if="!loading">
              ...
            </div>
            <div v-if="loading">Loading...</div>
          </div>
      `,
  data: {
    loading: true,
  },
});

/* 
    6.弹窗
    
*/
new Vue({
  el: "#app2",
  template: `
    <div>
        <button @click="handleClick">点击显示弹窗</button>
        <div v-show="isShow">
            弹窗
        </div>
    </div>
`,
  data: {
    isShow: false,
  },
  methods: {
    handleClick() {
      this.isShow = true;
    },
  },
});
