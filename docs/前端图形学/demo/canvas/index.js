// 简单的三角形拖动  颜色拾取方案 + isPointInPath方案
var canvas = document.createElement('canvas')
var hidecanvas = document.createElement('canvas')
var body = window.screen
canvas.width = hidecanvas.width = 500//body.availWidth 
canvas.height = hidecanvas.height = body.availHeight

document.body.appendChild(canvas)
// hidecanvas.className = 'hide'
// document.body.appendChild(hidecanvas)
var ctx = canvas.getContext('2d')
var hideCtx = hidecanvas.getContext('2d')

var point = [
    [100, 50],
    [200, 30],
    [130, 220],
]
let lineWidth = 1
let hideEl = {
    color: colorRadom(),
    point,
    lineWidth: lineWidth,
    ctx: hideCtx,
    fill: true,
}
let normalEl = {
    color: '#adf',
    point,
    lineWidth,
    ctx,
    changed: false, // 是否被修改过
    mouseDownPoint: null,
}

init()
function init() {
    // console.log(colorRadom())
    draw(normalEl)
    draw(hideEl)
}

canvas.addEventListener('mousedown', ev => {
    let x = ev.layerX,
        y = ev.layerY;
    let rgbaArr = hideCtx.getImageData(x, y, 1, 1).data
    let rgb = `rgba(${Array.prototype.slice.call(rgbaArr, 0, 3) + ''})`
    // console.log(rgb === mvElemet.color, rgb, mvElemet )
    // 判断是否点击到边框 颜色拾取方案
    // if (rgb === hideEl.color) {
    //     normalEl = {
    //         ...normalEl,
    //         mouseDownPoint: [x, y]
    //     }
    //     canvas.addEventListener('mousemove', moveEvent)

    //     draw({ ...normalEl, color: 'red' })
    // }
    // ispointinpath 方案
    if (hideCtx.isPointInPath(x, y)) {
        normalEl = {
            ...normalEl,
            mouseDownPoint: [x, y]
        }
        canvas.addEventListener('mousemove', moveEvent)

        draw({ ...normalEl, color: 'red' })
    }
})
canvas.addEventListener('mouseup', back2normal)
canvas.addEventListener('mouseout', back2normal)
function moveEvent(ev) {
    requestAnimationFrame(_ => {
        let x = ev.layerX,
            y = ev.layerY;
        let [oldx, oldy] = normalEl.mouseDownPoint
        let newx = x - oldx,
            newy = y - oldy;
        let point = normalEl.point.map(([x, y]) => [x + newx, y + newy])
        draw({ ...normalEl, point, color: 'ddd' })
        console.log(x, y)
    })
}
function back2normal(ev) {
    if (normalEl.mouseDownPoint) {
        let x = ev.layerX,
            y = ev.layerY;
        let [oldx, oldy] = normalEl.mouseDownPoint
        let newx = x - oldx,
            newy = y - oldy;
        let point = normalEl.point.map(([x, y]) => [x + newx, y + newy])
        normalEl.point = point
        hideEl.point = point
        canvas.removeEventListener('mousemove', moveEvent)
        normalEl = {
            ...normalEl,
            mouseDownPoint: null
        }
        draw(normalEl)
        draw(hideEl)
    }
}
function draw({ ctx, color, fill, point, lineWidth } = {}) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save()
    ctx.beginPath();
    color = color || '#000000'
    fill ? ctx.fillStyle = color :
        ctx.strokeStyle = color;

    ctx.lineWidth = lineWidth || 1

    point.forEach((point, index) => {
        !index ? ctx.moveTo(...point) :
            ctx.lineTo(...point)
    })
    ctx.closePath()
    fill ? ctx.fill() : ctx.stroke()
    ctx.restore()
}

function colorRadom() {
    return `rgba(${~~(Math.random() * 256)},${~~(Math.random() * 256)},${~~(Math.random() * 256)})`
}
/**
 * @fileoverview  讲rgb 转换成 hex
 * @param {number} r  红 
 */
function rgb2hex([r, g, b, a]) {
    return '#' + (r + '').toString(16)
}