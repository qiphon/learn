"use strict";
function Car(color) {
    console.log("xxx");
    this.color = color;
}
Car.myname = "别摸我";
Car.prototype.x = function () { }

function BWM(color) {
    Car.call(this, color);
}
// BWM.prototype = new Car();
// var __proto = Object.create(Car.prototype)
// __proto.constructor = BWM;
// BWM.prototype = __proto;
BWM.prototype = Object.create(Car.prototype, {
    constructor: {
        value: BWM,
        writable: false
    },
    test: {
        value: function () { }
    }
})
// BWM.prototype.test = function () { }
// Object.freeze(BWM.prototype);
BWM.prototype.constructor = function () { };
console.log("🍊", BWM.prototype.constructor);
var staticKeys = Object.entries(Car);
for (var i = 0; i < staticKeys.length; i++) {
    // console.log("🍊", staticKeys[i]);
    var key = staticKeys[i][0];
    var value = staticKeys[i][1];
    BWM[key] = value;
}
var bwm = new BWM();
console.log(bwm)
console.log(BWM.myname);