const App = new Vue({
  el: "#app",
  template: `
    <div>{{this.a}}</div>
  `,
  data: {
    a: 1,
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  created: function () {
    console.log("created");
  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated() {
    console.log("updated");
  },
  beforeDestroy() {
    console.log("beforeDestroy");
  },
  destroy() {
    console.log("destroy");
  },
  errorCaptured() {
    console.log("errorCaptured");
  },
});
