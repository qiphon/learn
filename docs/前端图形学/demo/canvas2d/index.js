let graphs = {};//缓存图形,维护图形与颜色对应的color

var canvas = document.getElementById('canvas');
var hideCanvas = document.getElementById('hideCanvas');

var ctx = canvas.getContext('2d');
var hideCtx = hideCanvas.getContext('2d');

hideCtx.width = ctx.width = canvas.width = hideCanvas.width = document.body.offsetWidth;
hideCtx.height = ctx.height = canvas.height = hideCanvas.height = document.body.offsetHeight;

//声明三角形的点
let trianglePoint = [{ x: 75, y: 50 }, { x: 100, y: 75 }, { x: 100, y: 25 }];

let downFlag = false;//是否按下
let selectedGraph = null;//当前选中的图形的元素颜色


initDraw(ctx, hideCtx, trianglePoint, false, 5, '#0000ff');//初始化绘图

canvas.addEventListener('mousedown', function (e) {
    let pointX = e.clientX, pointY = e.clientY;

    let getHideColor = hideCtx.getImageData(pointX, pointY, 1, 1).data;
    const getHexColor = rgbToHex(getHideColor[0], getHideColor[1], getHideColor[2]);
    const graphsData = graphs[getHexColor];//选中的图形信息
    selectedGraph = getHexColor;

    downFlag = {
        lastPointX: pointX,
        lastPointY: pointY
    };

    if (!graphsData) {
        return
    }

    const { points, isFill, lineWidth, color } = graphsData;

    graphsData.color = '#ff0000';//选中更新边框颜色
    drawGraph(ctx, hideCtx, points, isFill, lineWidth, getHexColor, graphsData.color);
}, false)

canvas.addEventListener('mousemove', function (e) {
    const graphsData = graphs[selectedGraph];//选中的图形信息
    if (!downFlag || !graphsData) {//判断是否鼠标点击或者选中图形
        return;
    }
    console.log(e)

    let pointX = e.clientX, pointY = e.clientY;//鼠标当前的位置
    let { lastPointX, lastPointY } = downFlag;//上一次鼠标的位置
    let distanceX = pointX - lastPointX, distanceY = pointY - lastPointY;//两次位置的差距

    let { points, isFill, lineWidth, color } = graphsData

    let newPoints = points.map((val) => {
        return {
            x: val.x + distanceX,
            y: val.y + distanceY
        }
    });//计算出新的点应该在的位置

    //更新位置
    downFlag = {
        lastPointX: pointX,
        lastPointY: pointY
    }
    graphsData.points = newPoints;//更新新坐标

    drawGraph(ctx, hideCtx, newPoints, isFill, lineWidth, selectedGraph, color);

}, false)

canvas.addEventListener('mouseup', function (e) {
    if (!downFlag) {
        return
    }
    downFlag = false
    const graphsData = graphs[selectedGraph];//选中的图形信息
    if (!graphsData) {//没有选中图形
        return
    }
    const { points, isFill, lineWidth, color } = graphsData;
    graphsData.color = '#000000'
    drawGraph(ctx, hideCtx, points, isFill, lineWidth, selectedGraph, graphsData.color);//选中更新边框颜色
    selectedGraph = null
}, false)

//初始化绘图函数
function initDraw(ctx, hideCtx, points, isFill, lineWidth, color) {
    //初始化图形及底色
    let roundColor = getRandomColor();
    graphs[roundColor] ? roundColor = getRandomColor() : '';//判断颜色是否已经使用过，如果已经有了 那么就重新更新颜色
    graphs[roundColor] = {//缓存整个页面的配置
        points: points,//缓存点
        color: color,//缓存颜色
        isFill: isFill,//缓存是否填充
        lineWidth: lineWidth//线的宽度
    }
    drawGraph(ctx, hideCtx, points, isFill, lineWidth, roundColor, color);//绘制可视化的画布
}



function drawGraph(ctx, hideCtx, points, isFill, lineWidth, lowColor, color) {
    drawSingleGraph(ctx, points, isFill, lineWidth, color);//绘制可视化的画布
    drawSingleGraph(hideCtx, points, isFill, lineWidth + 10, lowColor);
}


/**
 * ctx 绘图环境
 * point 图形的点
 * color 图形颜色
 * isFill 图形是否是填充
 */
function drawSingleGraph(ctx, point, isFill, lineWidth, color) {
    ctx.clearRect(0, 0, ctx.width, ctx.height);//清空画布
    ctx.save();//储存状态
    ctx.beginPath();
    color && (isFill ? ctx.fillStyle = color : ctx.strokeStyle = color);//判断是有颜色的情况，就设置颜色大小
    ctx.lineWidth = lineWidth;
    point.forEach((point, index) => {
        //index为0
        if (!index) {
            ctx.moveTo(point.x, point.y);
        } else {
            ctx.lineTo(point.x, point.y);
        }
    })
    ctx.closePath();
    isFill ? ctx.fill() : ctx.stroke();//判断是否是填充
    ctx.restore();//恢复上一次的状态
}


//随机生成16位的颜色值
function getRandomColor() {
    return '#' + (function (color) {
        return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)])
            && (color.length == 6) ? color : arguments.callee(color);
    })('');
}



function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}


function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}