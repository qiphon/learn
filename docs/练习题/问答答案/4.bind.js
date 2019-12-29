Function.prototype.bind = function (othis) {
    if (typeof this !== 'function') {
        throw new TypeError('请使用函数执行')
    }
    var slice = Array.prototype.slice
    var aArgs = slice.call(arguments, 1),
        // 当前的函数
        fToBind = this,
        fNop = function () { },
        fBound = function (args) {
            return fToBind.apply(this instanceof fBound ? this : othis, aArgs.concat(slice.call(arguments)))
        }
    if (fToBind.prototype) {
        fNop.prototype = fToBind.prototype
    }
    fBound.prototype = new fNop();
    return fBound
}

if (!Function.prototype.bind) (function () {
    var slice = Array.prototype.slice
    Function.prototype.bind = function () {
        var fToBind = this,
            othis = arguments[0],
            aArgs = slice.call(arguments, 1);
        if (typeof fToBind !== 'function') {
            throw new TypeError('Function.prototype.bind - ' +
                'what is trying to be bound is not callable');
        }
        var fBound = function () {
            var funcArgs = aArgs.concat(slice.call(arguments))
            return fToBind.apply(othis, funcArgs)
        }
        if (fToBind.prototype) {
            fNop.prototype = fToBind.prototype
        }
        fBound.prototype = new fNop();
        return fBound
    }
})();