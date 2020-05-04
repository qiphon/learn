exports.reverseStr = function (input) {
    console.log('input', input)
    return input.toString().split('').reverse().join('');
};