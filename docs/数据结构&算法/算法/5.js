/**
 * 判断数值
 * 请实现一个函数，用来判断字符串是否表示数值（包括整数和小数）。例如字符串
 * “+100”、“5e2”、“-123”、“3.124” 和 “-1E-16” 都表示数值。
 * 而 “12e”、“la3.14”、“1.21.1”、“+-4” 和 “12e+4.3” 不是
 */

 /**
  * 思路
  * 考虑所有情况
  * 1. 只能显示数字、符号位、小数点、指数为
  * 2. 小数点，指数符号只能出现一次、并且不能出现在开头结尾
  * 3. 指数位出现后，小数点不能再出现
  * 4. 符号位只能出现在开头和指数位后面
  */

function isNumber(s){
    if(s === undefined) return false;
    let hasPoint = false;
    let hasExp = false;
    for(let i =0; i< s.length; i++){
        const target = s[i]
        if(target[i]>=0 && target <= 9){
            continue;
        }else if(target.toLowerCase() === 'e'){
            if(hasExp) return false;
            else {
                hasExp = true;
                continue;
            }
        }else if(target === '.'){
            if(hasExp || hasPoint || i === s.length -1){
                return false;
            }else{
                hasPoint = true
                continue;
            }
        }else if( target === '-' || target === '+'){
            if(i === 0 || s[i - 1] === 'e' || s[i - 1] === 'E'){
                continue;
            }else{
                return false;
            }
        }else{
            return false
        }
    }   
    return true
}