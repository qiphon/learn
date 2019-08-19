(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{274:function(n,s,a){"use strict";a.r(s);var t=a(38),e=Object(t.a)({},function(){var n=this,s=n.$createElement,a=n._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[a("h1",{attrs:{id:"php-与-js-在面向对象中的区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#php-与-js-在面向对象中的区别","aria-hidden":"true"}},[n._v("#")]),n._v(" php 与 js 在面向对象中的区别")]),n._v(" "),a("ol",[a("li",[n._v("construct")])]),n._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v("// php 中的class有construct；es5中的类是用function实现的，并没有见到construct。\n\nfunction Car(){\n    console.log('在实例化的时候我就被执行了');\n}\nvar a = new Car();\n\n// __construct 在实例化的时候会被执行，其他代码没有被执行\n\n<?php\nheader(\"content-type: text/html; charset=utf-8;\");\nclass Car {\n    public function __construct($name)\n    {\n        echo '实例化的时候，我被执行';\n        echo '<br>';\n        $this->name = $name;\n    }\n    public function test()\n    {\n        echo '我没有被执行';\n        echo '<br>';\n    }\n    public function __destruct()\n    {   // 这个函数每当触发这个类都会被执行\n        echo '__destruct 最后被执行';\n        echo '<br>';\n    }\n}\n\n$c = new Car('c');\n\n// js 的function 在实例化的时候,里面所有的代码就会被执行一遍\nfunction Car(name){\n    this.name = name;\n    document.querySelector('body').style.backgroundColor = 'red'\n}\nvar c = new Car('c')\n\n// 我们会在控制台看到如下信息\n\nCar {name: \"c\"}\nname: \"c\"\n__proto__:\nconstructor: ƒ Car(name)\n__proto__: Object   // js 的继承是原型链继承，所有方法和类的根 __proto__ 都指向object\n\n// 还用上面的例子， js中所有的方法都挂载在原型链上\nfunction Car(name){\n    this.name = name;\n}\nCar.prototype.run = function(){\n    console.log(this.name + ' is run')\n}\nvar c = new Car('c')\n\n\n// js中继承的实现\nfunction Car(name){\n    this.name = name;\n}\nCar.prototype.run = function(){\n    console.log(this.name + ' is run')\n}\n// var c = new Car('c')\nfunction B(name){\n    Car.call(this, name);  // 这样属性就会被复制过来了\n}\n\nvar __proto = Object.create(Car.prototype) // 这样就能拿到 car的所有方法，但是我们不能直接将他赋值给B，因为它的constructor 还是Car\n__proto.constructor = B;  // 手动改变构造器，这样就能为我们所用了,只有构造器是自己了，方法中的this才能转过来\nB.prototype = __proto;\nB.prototype.action = function(){\n    console.log(this.name + ' action')\n}\nvar b = new B('b')\n\n")])]),n._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[n._v("1")]),a("br"),a("span",{staticClass:"line-number"},[n._v("2")]),a("br"),a("span",{staticClass:"line-number"},[n._v("3")]),a("br"),a("span",{staticClass:"line-number"},[n._v("4")]),a("br"),a("span",{staticClass:"line-number"},[n._v("5")]),a("br"),a("span",{staticClass:"line-number"},[n._v("6")]),a("br"),a("span",{staticClass:"line-number"},[n._v("7")]),a("br"),a("span",{staticClass:"line-number"},[n._v("8")]),a("br"),a("span",{staticClass:"line-number"},[n._v("9")]),a("br"),a("span",{staticClass:"line-number"},[n._v("10")]),a("br"),a("span",{staticClass:"line-number"},[n._v("11")]),a("br"),a("span",{staticClass:"line-number"},[n._v("12")]),a("br"),a("span",{staticClass:"line-number"},[n._v("13")]),a("br"),a("span",{staticClass:"line-number"},[n._v("14")]),a("br"),a("span",{staticClass:"line-number"},[n._v("15")]),a("br"),a("span",{staticClass:"line-number"},[n._v("16")]),a("br"),a("span",{staticClass:"line-number"},[n._v("17")]),a("br"),a("span",{staticClass:"line-number"},[n._v("18")]),a("br"),a("span",{staticClass:"line-number"},[n._v("19")]),a("br"),a("span",{staticClass:"line-number"},[n._v("20")]),a("br"),a("span",{staticClass:"line-number"},[n._v("21")]),a("br"),a("span",{staticClass:"line-number"},[n._v("22")]),a("br"),a("span",{staticClass:"line-number"},[n._v("23")]),a("br"),a("span",{staticClass:"line-number"},[n._v("24")]),a("br"),a("span",{staticClass:"line-number"},[n._v("25")]),a("br"),a("span",{staticClass:"line-number"},[n._v("26")]),a("br"),a("span",{staticClass:"line-number"},[n._v("27")]),a("br"),a("span",{staticClass:"line-number"},[n._v("28")]),a("br"),a("span",{staticClass:"line-number"},[n._v("29")]),a("br"),a("span",{staticClass:"line-number"},[n._v("30")]),a("br"),a("span",{staticClass:"line-number"},[n._v("31")]),a("br"),a("span",{staticClass:"line-number"},[n._v("32")]),a("br"),a("span",{staticClass:"line-number"},[n._v("33")]),a("br"),a("span",{staticClass:"line-number"},[n._v("34")]),a("br"),a("span",{staticClass:"line-number"},[n._v("35")]),a("br"),a("span",{staticClass:"line-number"},[n._v("36")]),a("br"),a("span",{staticClass:"line-number"},[n._v("37")]),a("br"),a("span",{staticClass:"line-number"},[n._v("38")]),a("br"),a("span",{staticClass:"line-number"},[n._v("39")]),a("br"),a("span",{staticClass:"line-number"},[n._v("40")]),a("br"),a("span",{staticClass:"line-number"},[n._v("41")]),a("br"),a("span",{staticClass:"line-number"},[n._v("42")]),a("br"),a("span",{staticClass:"line-number"},[n._v("43")]),a("br"),a("span",{staticClass:"line-number"},[n._v("44")]),a("br"),a("span",{staticClass:"line-number"},[n._v("45")]),a("br"),a("span",{staticClass:"line-number"},[n._v("46")]),a("br"),a("span",{staticClass:"line-number"},[n._v("47")]),a("br"),a("span",{staticClass:"line-number"},[n._v("48")]),a("br"),a("span",{staticClass:"line-number"},[n._v("49")]),a("br"),a("span",{staticClass:"line-number"},[n._v("50")]),a("br"),a("span",{staticClass:"line-number"},[n._v("51")]),a("br"),a("span",{staticClass:"line-number"},[n._v("52")]),a("br"),a("span",{staticClass:"line-number"},[n._v("53")]),a("br"),a("span",{staticClass:"line-number"},[n._v("54")]),a("br"),a("span",{staticClass:"line-number"},[n._v("55")]),a("br"),a("span",{staticClass:"line-number"},[n._v("56")]),a("br"),a("span",{staticClass:"line-number"},[n._v("57")]),a("br"),a("span",{staticClass:"line-number"},[n._v("58")]),a("br"),a("span",{staticClass:"line-number"},[n._v("59")]),a("br"),a("span",{staticClass:"line-number"},[n._v("60")]),a("br"),a("span",{staticClass:"line-number"},[n._v("61")]),a("br"),a("span",{staticClass:"line-number"},[n._v("62")]),a("br"),a("span",{staticClass:"line-number"},[n._v("63")]),a("br"),a("span",{staticClass:"line-number"},[n._v("64")]),a("br"),a("span",{staticClass:"line-number"},[n._v("65")]),a("br"),a("span",{staticClass:"line-number"},[n._v("66")]),a("br"),a("span",{staticClass:"line-number"},[n._v("67")]),a("br"),a("span",{staticClass:"line-number"},[n._v("68")]),a("br"),a("span",{staticClass:"line-number"},[n._v("69")]),a("br"),a("span",{staticClass:"line-number"},[n._v("70")]),a("br"),a("span",{staticClass:"line-number"},[n._v("71")]),a("br"),a("span",{staticClass:"line-number"},[n._v("72")]),a("br"),a("span",{staticClass:"line-number"},[n._v("73")]),a("br"),a("span",{staticClass:"line-number"},[n._v("74")]),a("br"),a("span",{staticClass:"line-number"},[n._v("75")]),a("br"),a("span",{staticClass:"line-number"},[n._v("76")]),a("br"),a("span",{staticClass:"line-number"},[n._v("77")]),a("br")])])])},[],!1,null,null,null);s.default=e.exports}}]);