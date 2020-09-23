// 重载
interface Direction2 {
  top: number
  right: number
  bottom: number
  left: number
}

function assigned(all: number): Direction2
function assigned(topAndBottom: number, leftAndRight: number): Direction2
function assigned(top: number, right: number, bottom: number, left: number): Direction2

// 代码实现函数不可被调用
function assigned(a: number, b?: number, c?: number, d?: any) {
  if (b === undefined && c === undefined && d === undefined) {
    b = c = d = a
  } else if (c === undefined && d === undefined) {
    c = a
    d = b
  }
  return {
    top: a,
    right: b,
    bottom: c,
    left: d
  }
}
// assigned(1)
// assigned(1, 2)
// assigned(1, 2, 3)
// assigned(1, 2, 3, 4)