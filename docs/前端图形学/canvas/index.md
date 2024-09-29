# [canvas](https://www.canvasapi.cn/)

### 马赛克的实现原理

要了解马赛克原理我们需要提前知道 canvas 的 getImageData、putImageData 方法。

getImageData 会将整个（也可以是部分区域） canvas 画布数据返回。值是一个一维数组，数组的长度为 `<canvas 高度> * <canvas 宽度> * 4` ，即数组里的每 4 位为一个 canvas 像素点（可以通过 getImageData setting 属性修改，默认是 srgb）。所以 canvas 中像素点的逻辑是从上到下，从左到右；一横行，一横行的绘制。到达行尽头的时候换行继续绘制

putImageData 用于将指定的画布数据绘制到 canvas 中的指定位置
