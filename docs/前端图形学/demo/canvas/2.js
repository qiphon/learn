// 简单的三角形拖动  颜色拾取方案 + isPointInPath方案
// 增加 三角形的角可以拖动
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

// 支持操控的元素
let mvEle = [
    {
        point,
        color: colorRadom(),
        fill: true,
        type: 'Line',
        lineWidth,
    },
]

point.forEach((it, i) => {
    mvEle.push({
        point: it,
        color: `rgb(${it + ''},${i})`,
        fill: true,
        type: 'Arc',
        r: 5,
        start: 0,
        end: Math.PI * 2
    })
})

let hideEl = {
    points: mvEle,
    ctx: hideCtx,
    fill: true,
    match: null,
}

let normalEl = {
    color: '#adf',
    point,
    lineWidth,
    ctx,
    changed: false, // 是否被修改过
    // pointLine: null,
}

init()
function init() {
    drawLine(normalEl)
    hideEl.points.forEach((it, i) => {
        let { ctx } = hideEl;
        window[`draw${it.type}`]({ ctx, ...it });
    })
}

canvas.addEventListener('mousedown', ev => {
    let x = ev.layerX,
        y = ev.layerY;
    let rgbaArr = hideCtx.getImageData(x, y, 1, 1).data
    let rgb = `rgb(${Array.prototype.slice.call(rgbaArr, 0, 3) + ''})`
    // console.log(rgb, mvEle)
    let match = null
    hideEl.points.forEach(it => {
        // console.log(it.color === rgb, it.color)
        it.color === rgb ?
            match = it : void 0;
    })
    // console.log(match, 'match ', rgb)
    if (!match) return;
    hideEl.match = { ...match }
    window[`draw${match.type}`]({ ctx: normalEl.ctx, ...match, color: 'red' })
    // // 拖动
    // if (match.type === 'Line') {
    //     normalEl.pointLine = [x, y]
    // }
    // // 移动点
    // if (match.type === 'Arc') {
    //     normalEl.arcPoint = [x, y]
    // }
    normalEl[`point${match.type}`] = [x, y]

    canvas.addEventListener('mousemove', moveEvent)
})
canvas.addEventListener('mouseup', back2normal)
canvas.addEventListener('mouseout', back2normal)
function moveEvent(ev) {
    // normalEl.pointLine &&
    //     requestAnimationFrame(_ => {
    //         let x = ev.layerX,
    //             y = ev.layerY;
    //         let [oldx, oldy] = normalEl.pointLine
    //         let newx = x - oldx,
    //             newy = y - oldy;
    //         let point = normalEl.point.map(([x, y]) => [x + newx, y + newy])
    //         drawLine({ ...normalEl, point, color: 'ddd' })
    //         // console.log(x, y)
    //     })
    requestAnimationFrame(_ => {
        let x = ev.layerX,
            y = ev.layerY;
        getNewPoint({ x, y })
    })
}
function back2normal(ev) {
    let { match } = hideEl
    if (!match) return;
    canvas.removeEventListener('mousemove', moveEvent)
    let x = ev.layerX,
        y = ev.layerY;
    getNewPoint({ x, y, end: true })
    hideEl.match = null
}

/**
 * @fileoverview 讲坐标点转换成新的值
 */
function getNewPoint({ x, y, end } = {}) {
    let { match } = hideEl
    let [oldx, oldy] = match.point
    if (match.type === 'Line') {
        let [oldx, oldy] = normalEl[`point${match.type}`]
        let newx = x - oldx,
            newy = y - oldy;
        let point = normalEl.point.map(([x, y]) => [x + newx, y + newy])
        normalEl = {
            ...normalEl,
            point,
            // pointLine: null
        }
        hideEl.points.forEach(it => {
            // console.log(it);
            it.point = it.point[0] instanceof Array ?
                it.point.map(([x, y]) => [x + newx, y + newy]) :
                [it.point[0] + newx, it.point[1] + newy]
        })
    }
    if (match.type === 'Arc') {
        hideEl.points.forEach(it => {
            // console.log(it, it.type, oldx, oldy)
            if (it.type === 'Line') {
                it.point = it.point.map(([dx, dy]) => {
                    // console.log(dx,dy, oldy,oldx)
                    if (dx === oldx && dy === oldy) return [x, y]
                    return [dx, dy]
                })
                normalEl.point = it.point
            }
            if (it.type === 'Arc') {
                let [dx, dy] = it.point
                if (dx === oldx && dy === oldy) it.point = [x, y]
            }
        })
        // console.log(hideEl, x, y)
    }
    match.point = normalEl[`point${match.type}`] = end ? null :
        [x, y]

    init()
}

function drawLine({ ctx, color, fill, point, lineWidth } = {}) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save()
    ctx.beginPath();
    color = color || '#000000'
    fill ? ctx.fillStyle = color :
        ctx.strokeStyle = color;

    ctx.lineWidth = lineWidth || 1

    point.forEach((p, index) => {
        !index ? ctx.moveTo(...p) :
            ctx.lineTo(...p)
    })
    ctx.lineTo(...point[0])
    // ctx.closePath()
    fill ? ctx.fill() : ctx.stroke()
    ctx.restore()
}
function drawArc({ ctx, color, fill, point, lineWidth, r, start, end, reverse = false } = {}) {
    ctx.beginPath()
    ctx.save()
    ctx.lineWidth = lineWidth
    ctx.arc(...point, r, start, end, reverse)
    if (fill) {
        ctx.fillStyle = color
        ctx.fill()
    } else {
        ctx.strokeStyle = color
        ctx.stroke()
    }
    ctx.restore()
}
function colorRadom() {
    return `rgb(${~~(Math.random() * 256)},${~~(Math.random() * 256)},${~~(Math.random() * 256)})`
}
