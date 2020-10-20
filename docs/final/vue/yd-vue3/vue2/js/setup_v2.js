//实时更新   Vue 2.6.0
const store = Vue.observable({
  name: "京程一灯🏮",
});
const mutations = {
  setName(data) {
    store.name = data;
  },
};
/* ---------------Usage with Templates----------------- */
const App = new Vue({
  el: "#app",
  template: `
    <div>
         <h2>{{ this.foo }}</h2>
         <span @click="findClick">{{getName}}</span>
         <hr/>
    </div>
  `,
  computed: {
    getName() {
      return store.name;
    },
  },
  methods: {
    findClick() {
      mutations.setName("我改了");
    },
  },
  mounted() {
    this.foo = store.name;
  },
  data: {
    foo: "bar",
  },
});

/* ---------------Usage with Render Functions / JSX----------------- */
const state = Vue.observable({ count: 0 });
const App1 = new Vue({
  el: "#app1",
  data: {
    count: 0,
    foo: "bar",
  },
  render(h) {
    return h(
      "button",
      {
        on: {
          click: () => {
            mutations.setName("我改了" + Math.random());
          },
        },
      },
      `简单的store: ${store.name}`
    );
  },
});

/* ---------------第一个 Arguments ----------------- */
// props
const App2 = Vue.component("app-2", {
  template: `
    <div>{{name}}</div>
  `,
  props: {
    name: String,
  },
  created() {
    console.log(this.name);
  },
});
const App2_parent = new Vue({
  el: "#app2",
  components: { "app-2": App2 },
  template: `
        <div ><app-2 name="app-2传递的值"></app-2></div>
    `,
});

/* ---------------Usage of this----------------- */
// vue2中可以使用this
const App3 = new Vue({
  el: "#app3",
  template: `
      <div>
        <div>{{ count }}</div>
        <button @click="handleClick">点击</button>
      </div>
    `,
  data: {
    count: 0,
  },
  methods: {
    handleClick() {
      console.log(this); // vue实例
      console.log(this.count); // 0
    },
  },
});
