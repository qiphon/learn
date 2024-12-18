let uid = 0;

function Watcher(vm, node, name, type) {
    // vm  {{text}}  text   'nodeValue'

    Dep.target = this;//watcher 
    this.name = name; // text
    this.id = ++uid; // uid 

    this.node = node; //{{text}}
    this.vm = vm; // vm 
    this.type = type; //  'vlaue'

    this.update();
    Dep.target = null;
}


Watcher.prototype = {

    //update
    update: function () {
        this.get();

        //
        if (!batcher) {
            batcher = new Batcher();
            // console.log(this.node);
            // this.node[this.type] = this.value;
        }
        batcher.push(this);

        //span.nodeValue =  this.vm.text
        //input.value

        // this.node[this.type] = this.value; // 订阅者执行相应操作
    },
    cb: function () {
        //最终实际虚拟dom处理的结果 只处理一次
        console.log("dom update");
        this.node[this.type] = this.value; // 订阅者执行相应操作
    },

    // 获取data的属性值
    get: function () {
        //vm[text] 'hello world'
        this.value = this.vm[this.name]; //触发相应属性的get

        //vm['text']

    }
}