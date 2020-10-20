const App = new Vue({
    el:"#app",
    template:`
        <div>
            {{handleName}}
            <button @click="handleClick">点击</button>
        </div>
    `,
    data: { name: 'yideng' },
    computed: {
      // 仅读取
      getName: function () {
        return this.name
      },
      // 读取和设置
      handleName: {
        get: function () {
          return this.name
        },
        set: function (v) {
          this.name = v + "-beijing"
        }
      }
    },
    methods:{
        handleClick(){
            this.handleName = this.name;
        }
    }
  })
