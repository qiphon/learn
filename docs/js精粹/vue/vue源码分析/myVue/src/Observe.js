

//vm  'text'   'hello world'
function defineReactive(vm, key, val) {

  //收集依赖处理
  var dep = new Dep();

  Object.defineProperty(vm, key, {
    get: function () {

      if (Dep.target) { //js单线程，同一时间，只有一个dep.target
        //记录一个东西
        dep.addSub(Dep.target);
      }
      return val;
    },
    set: function (newVal) {
      if (newVal === val) return;
      val = newVal;
      // 作为发布者发出通知
      dep.notify();
    }
  })
}

/**
 {
    text: 'hello world'
  }，
  vm
 */
function observe(obj, vm) {
  //[text]
  Object.keys(obj).forEach(function (key) {
    //'text'
    defineReactive(vm, key, obj[key]);
  })
}