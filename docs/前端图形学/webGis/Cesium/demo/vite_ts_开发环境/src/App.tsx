import './App.css'
import { CesiumWidget, ProviderViewModel, Viewer } from 'cesium'
import '@cesium/widgets/Source/widgets.css'
import { useEffect, useRef } from 'react'

function App() {
  const cesiumContainer = useRef<HTMLDivElement | null>(null)
  const viewer = useRef<Viewer | null>(null)
  useEffect(() => {
    if (cesiumContainer.current) {
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
    }
  }, [])
  return <div ref={cesiumContainer} id="cesiumContainer"></div>
}

export default App
