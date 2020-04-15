var util = require('util');
function Base() {
    this.name = 'base';
    this.base = 1991;
    this.sayHello = function () {
        console.log('Hello ' + this.name);
    };
}
Base.prototype.showName = function () {
    console.log(this.name);
};
function Sub() {
    this.name = 'sub';
}
util.inherits(Sub, Base);
var objBase = new Base();
objBase.showName();
objBase.sayHello();
console.log(objBase);
var objSub = new Sub();
objSub.showName();
console.log(objSub); 
// objSub.sayHello(); 
console.log(objSub + '11'); 
console.log('===========inspect============')
console.log(util.inspect(objSub) + '11')
console.log(util.inspect(objBase, true, 3, true))