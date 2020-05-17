(function () {
  var lastFrameTime = Date.now();
  requestAnimationFrame(function () {
    var currnetFrameTime = Date.now();
    if (currnetFrameTime - lastFrameTime > 50) {
    }
  });
})();
