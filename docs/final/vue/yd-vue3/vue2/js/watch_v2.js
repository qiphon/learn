const App = new Vue({
  el: "#app",
  template:`
    <button @click="handleClick">点击</button>
  `,
  data: {
    name: "京程一灯",
    address: "北京",
  },
  watch: {
    name: {
      handler: function (value, oldValue) {
        console.log(value, oldValue);
      },
      // 设置immediate,创建的时候会立即执行
      immediate: true,
    },
    address:function(value,oldValue){
        // 没有设置immediate,在创建的时候不会执行，
        console.log(value,oldValue);
    }
  },
  methods:{
    handleClick(){
        // 触发监听
        this.name = "yideng";
        this.address = "beijing";
    }
  }
});
