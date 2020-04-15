process.on('exit', function (code) {

    // 以下代码永远不会执行
    setTimeout(function () {
        console.log("该代码不会执行");
    }, 0);
    // exit 回调中只能执行同步任务
    console.log('退出码为:', code);
});
console.log("程序执行结束");