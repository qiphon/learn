const App = new Vue({
  el: "#app",
  template: `
    <div>{{reactiveData.name}}--{{reactiveData.address}}</div>
  `,
  data() {
    return {
      reactiveData: { name: "yideng", address: "beijing" },
    };
  },
});
