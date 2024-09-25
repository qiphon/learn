# [cesium](http://cesium.xin/)

- [homepage](https://cesium.com/learn/cesiumjs-learn/)
- [api doc](https://cesium.com/learn/cesiumjs/ref-doc/)
- [中文 api 文档](http://cesium.xin/cesium/cn/Documentation1.95/Animation.html)

Cesium 是一个跨平台、跨浏览器的展示三维地球和地图的 javascript 库。

Cesium 使用WebGL 来进行硬件加速图形，使用时不需要任何插件支持，但是浏览器必须支持WebGL;

Cesium是基于Apache2.0 许可的开源程序。它可以免费的用于商业和非商业用途。

### cesium 能力

- 支持2D,2.5D,3D 形式的地图展示，
- 可以绘制各种几何图形、高亮区域，支持导入图片，甚至3D模型等多种数据可视化展示
- 可用于动态数据可视化并提供良好的触摸支持，支持绝大多数的浏览器和mobile。
- Cesium还支持基于时间轴的动态数据展示

### 环境搭建

- node
- npm
- `npm install cesium --save`
- vite 模式需要配合 `vite-plugin-static-copy` 使用，可以参考 https://github.com/qiphon/cesium_test_1

## api

#### 隐藏控件

```ts
viewer.current = new Viewer(cesiumContainer.current, {
  timeline: false, // 时间控件
  animation: false, // 动画控件
  navigationHelpButton: false, // 帮助按钮
  geocoder: false, // 搜索按钮
  homeButton: false, // 首页按钮
  fullscreenButton: false, // 全屏按钮
  baseLayerPicker: false, // 图层选择按钮
  sceneModePicker: false, // 投影方式按钮
  // cesium 标识无法通过 api 去除，可以通过 css 去除。 cesium-viewer-bottom
})
```

#### 经纬度坐标 笛卡尔坐标 相互转换

```ts
// 经纬度 转 笛卡尔坐标
const cartesian = Cartesian3.fromDegrees(111, 22, 33)

console.log(cartesian)

// 笛卡尔坐标转弧度坐标
const cartographic = Cartographic.fromCartesian(cartesian)
console.log(cartographic)

// 弧度转角度
const lon = (180 / Math.PI) * cartographic.longitude
const lat = (180 / Math.PI) * cartographic.latitude

// 也可以使用系统 api
const lon2 = CesiumMath.toDegrees(cartographic.longitude)
const lat2 = CesiumMath.toDegrees(cartographic.latitude)

console.log(lon, lat, lon2, lat2)
```

### 相机

3d 相机视角使用到 3 个参数，xyz。

- heading , 默认 0 ， 相当于脑袋左右旋转
- pitch ，默认 -90 ，相当于低头、抬头角度，默认向下低头看
- roll ，默认 0 ，相当于歪头看

带移动动画的相机移动

```ts
viewer.current?.camera.flyTo({
  destination: cartesian,
  orientation: {
    heading: 0,
    pitch: -70,
    roll: 0,
  },
  // duration: 2,
})
```

相机直接跳转到指定的点

```ts
viewer.current?.camera.setView({
  destination: cartesian,
  orientation: {
    heading: 0,
    pitch: -90,
    roll: 0,
  },
})
```

相机固定到指定的视角

```ts
// 经纬度 转 笛卡尔坐标
const cartesian = Cartesian3.fromDegrees(111, 42, 330000)

viewer.current?.camera.lookAt(cartesian, new HeadingPitchRange(0, -90, 30))
```

### 点、线、面

所有的地图上的标记都是一个实体 （entity）

#### 绘制一个红点🔴

```ts
// 经纬度 转 笛卡尔坐标
const cartesian = Cartesian3.fromDegrees(111, 42, 330000)

const point = new Entity({
  position: cartesian,
  point: {
    pixelSize: 20,
    color: Color.fromBytes(255, 0, 0, 255),
  },
})

viewer.current?.entities.add(point)
viewer.current?.zoomTo(point)
```

也可以不使用 `new Entity`

```ts
const point = {
  position: cartesian,
  id: 'abc',
  point: {
    pixelSize: 20,
    color: Color.fromBytes(255, 0, 0, 255),
  },
}

const pointEntity = viewer.current?.entities.add(point)
viewer.current?.zoomTo(pointEntity)
```

#### 标注

添加图片

```ts
const imgEntity = viewer.current?.entities.add({
  id: 'position_icon',
  position: Cartesian3.fromDegrees(111, 22, 10),
  billboard: {
    image: positionIcon,
    color: Color.fromBytes(255, 0, 0, 255),
    sizeInMeters: true,
  },
})

viewer.current?.zoomTo(imgEntity)
```

文字

```ts
const entity = viewer.current?.entities.add({
  id: 'position_icon_label',
  position: Cartesian3.fromDegrees(111, 22, 130),
  label: {
    text: '这是一段描述',
    fillColor: Color.fromBytes(255, 0, 0, 255),
  },
})

viewer.current?.zoomTo(entity)
```

折线

```ts
const entity = viewer.current?.entities.add({
  polyline: {
    positions: Cartesian3.fromDegreesArray([111, 22, 111, 23, 112, 24]),
    width: 5,
    material: Color.YELLOW,
  },
})

viewer.current?.zoomTo(entity)
```

多边形

```ts
const entity = viewer.current?.entities.add({
  polygon: {
    hierarchy: Cartesian3.fromDegreesArray([112, 24, 112, 27, 113, 21]),
    fill: false,
    material: Color.RED,
    height: 400000,
    extrudedHeight: 300000, // 纵向高度
    outline: true,
    outlineColor: Color.BLUE,
  },
})

viewer.current?.zoomTo(entity)
```

长方形形盒子

```ts
const entity = viewer.current?.entities.add({
  position: Cartesian3.fromDegrees(111, 33, 30000),
  box: {
    dimensions: new Cartesian3(2000, 3000, 3000), // 长宽高
    material: Color.RED,
  },
})

viewer.current?.zoomTo(entity)
```

### 相关资料

- [世界气象站数据获取](https://www.ladybug.tools/epwmap/)
- [wmo 天气数据](https://climate.onebuilding.org/sources/default.html)
- [energy plus](https://energyplus.net/weather)
- [欧盟光辐射信息展示](https://re.jrc.ec.europa.eu/pvg_tools/en/)
