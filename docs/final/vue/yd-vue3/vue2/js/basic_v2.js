// 基础示例Vue2
new Vue({
  el: "#app",
  template: `
    <div>
        <div>Count is: {{ this.count }}, double is: {{ this.double }}</div>
        <button @click="increment">Add</button>
    </div>
`,
  data: {
    count: 0,
  },
  computed: {
    double() {
      return this.count * 2;
    },
  },
  methods: {
    increment() {
      this.count++;
    },
  },
});
