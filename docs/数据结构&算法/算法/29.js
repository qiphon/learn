/**
 * 你正在和朋友玩 “猜数字”（bulls and Cows）游戏：你写下一个数字让你多朋友猜。
 * 每次他猜测后，你给他一个提示，告诉他有多少位数字和确切位置猜对了（称为“bulls”，
 * 公牛），有多少位数字猜对了但是位置不对（称为“Cow”， 奶牛）。你的朋友将会根据
 * 提示继续猜，知道猜出秘密数字
 * 
 * 示例1：
 * 输入： secret = “1807”  ， guess = “7810”
 * 输出：“1A3b”
 * 
 * 
 * 示例2：
 * 输入： secret = “1123”  ， guess = “0111”
 * 输出：“1A1b”
 * 
 * 
 * 参考答案：
 * 1. 先判断几个 Bull（位置和数字一样）
 * 2. 出现 bull 将秘密数字跟朋友猜测的这个位置上的数字移除
 * 3. 剩下的字符串再判断有几个 cow
 */

var getHint = function(secret, guess){
    var bull = 0
    var cow = 0

    var skeep = []
    var gkeep = []

    for(var i in guess){
        if(secret[i] === guess[i]){
            bull++
        }else {
            skeep.push(secret[i])
            gkeep.push(guess[i])
        }
    }

    // cow
    for (let j in gkeep){
        let findIndex = skeep.indexOf(gkeep[j])
        if(findIndex != -1){
            cow ++
            skeep[findIndex] = null
        }
    }

    return `${bull}A${cow}B`
}