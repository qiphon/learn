// 基本用法
const App = new Vue({
  el: "#app",
  template: `
        <div ref="divDom">ref示例</div>
    `,
  data: {},
  mounted() {
    console.log(this.$refs.divDom); // <div>ref示例</div>
  },
});

// 搭配v-for使用
new Vue({
  el: "#app1",
  template: `
        <ul>
            <li v-for="(obj,index) in list1" :key="index" :ref="index">{{obj}}</li>
        </ul>
      `,
  data: {
    list1: ["a", "b", "c", "d"],
  },
  mounted() {
    this.list1.forEach((obj, index, arr) => {
      console.log(this.$refs[index][0].innerText);
    });
  },
});
