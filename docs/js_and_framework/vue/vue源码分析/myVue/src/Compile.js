
/**
  <input type="text" id="a" v-model="text">
  {{text}}

  vm
*/
function Compile(node, vm) {

  //获取到的节点
  if (node) {

    this.$frag = this.nodeToFragment(node, vm);

    return this.$frag; //处理之后的dom
  }
}



Compile.prototype = {

  /**
  <input type="text" id="a" v-model="text">
    {{text}}

    vm
  */

  nodeToFragment: function (node, vm) {

    var self = this;

    var frag = document.createDocumentFragment();//文档片段中
    var child;//




    //<input type="text" id="a" v-model="text">
    while (child = node.firstChild) {

      self.compileElement(child, vm);
      frag.append(child); // 将所有子节点添加到fragment中

    }

    return frag;
  },
  compileElement: function (node, vm) {
    var reg = /\{\{(.*)\}\}/;//正则表达式
    // {{text}}

    //节点类型为元素
    if (node.nodeType === 1) {
      var attr = node.attributes;
      // 解析属性
      for (var i = 0; i < attr.length; i++) {
        if (attr[i].nodeName == 'v-model') {
          var name = attr[i].nodeValue; // 获取v-model绑定的属性名

          node.addEventListener('input', function (e) {
            // 给相应的data属性赋值，进而触发该属性的set方法
            //再批处理 渲染元素
            vm[name] = e.target.value;//set 
          });
          // node.value = vm[name]; // 将data的值赋给该node
          //<input type="text" id="a" v-model="text">
          new Watcher(vm, node, name, 'value');
        }
      };
    }



    //{{text}}
    //节点类型为text
    if (node.nodeType === 3) {
      if (reg.test(node.nodeValue)) {
        var name = RegExp.$1; // 获取匹配到的字符串  ,//text??
        name = name.trim();


        //
        new Watcher(vm, node, name, 'nodeValue');
      }
    }
  },
}

