function Dep() {
  this.subs = [];//电话本
}
Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub);//记录电话
  },
  notify: function () {
    //打电话操作
    this.subs.forEach(function (sub) {
      //sub==>watcher
      sub.update();
      //watcher的update
    })
  }
}