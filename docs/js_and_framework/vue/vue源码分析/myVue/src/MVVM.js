
/**
{
  el: 'app',
  data: {
    text: 'hello world'
  }
}

*/
function Vue(options) {
  /**
  
     data: {
      text: 'hello world'
    }

    this ==> VM 
    this.data
  */
  this.data = options.data;
  var data = this.data;

  //observe 中做处理响应式数据的逻辑 ，get set
  //?? get 获取数据  set ？？修改数据
  observe(data, this);


  var id = options.el;//??'app' 


  /**
     <input type="text" id="a" v-model="text">
    {{text}}
  */

  //编译，替换数据
  var dom = new Compile(document.getElementById(id), this);//??

  //编译之后，嵌入数据之后的dom？？

  // 编译完成后，将dom返回到app中
  document.getElementById(id).appendChild(dom);
}
//template
