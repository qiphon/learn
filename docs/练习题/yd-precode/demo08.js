function yideng() {
    console.log(1);
}
(function () {
    if (false) {
        function yideng() {
            console.log(2);
        }
    }
    console.log(yideng);
    yideng();
})();
// 1 = (10 - 99/10)