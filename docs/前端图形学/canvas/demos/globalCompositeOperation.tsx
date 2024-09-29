/**
 * @file 马赛克 demo
 */

import { useEffect, useRef, useState } from 'react'
import img from '../../../imgs/flutter_lifecycle.png'

export const GlobalCompositeOperation = () => {
  const cvsEl = useRef<HTMLCanvasElement>()
  const cvsEl2 = useRef<HTMLCanvasElement>()
  const cvsEl3 = useRef<HTMLCanvasElement>()
  const ctxMode = useRef<GlobalCompositeOperation>('source-over')

  const [showDataSourceInfo, setShowDataSourceInfo] = useState('')

  const initCvs = (el, imgWidth, imgHeight) => {
    el.setAttribute('style', `width: ${imgWidth}px;height: ${imgHeight}px;`)
    el.width = imgWidth
    el.height = imgHeight
  }

  const drawImg = (
    el: HTMLCanvasElement,
    {
      sourceOver,
      sourceOverAndDestinationIn,
      doubleCvs,
    }: {
      sourceOver?: boolean
      sourceOverAndDestinationIn?: boolean
      doubleCvs?: boolean
    },
  ) => {
    const ctx = el.getContext('2d')
    const imgEL = new Image()
    imgEL.src = img
    imgEL.onload = ev => {
      const imgObj = ev.target
      const wd = imgObj.naturalWidth
      const ht = imgObj.naturalHeight
      initCvs(el, wd, ht)
      const scaleRate = 1
      requestAnimationFrame(() => {
        ctx.drawImage(imgEL, 0, 0, wd * scaleRate, ht * scaleRate, 0, 0, wd, ht)

        if (sourceOver) {
          el.onmouseenter = () => {
            ctx.beginPath()
            el.onmousemove = ev => {
              ctx.globalCompositeOperation = ctxMode.current
              // ctx.globalCompositeOperation = 'source-in'
              let { left, top } = el.getBoundingClientRect()

              let mouseXinCvs = ev.clientX - left
              let mouseYinCvs = ev.clientY - top

              console.log('ctx mode ', ctxMode.current, {
                x: mouseXinCvs,
                y: mouseYinCvs,
              })
              ctx.lineTo(mouseXinCvs, mouseYinCvs)
              ctx.strokeStyle = 'red'
              ctx.lineWidth = 12
              ctx.stroke()
            }
          }
        }

        if (sourceOverAndDestinationIn) {
          el.onmouseenter = () => {
            ctx.beginPath()
            el.onmousemove = ev => {
              ctx.globalCompositeOperation = 'source-over'
              ctx.drawImage(
                imgEL,
                0,
                0,
                wd * scaleRate,
                ht * scaleRate,
                0,
                0,
                wd,
                ht,
              )
              ctx.globalCompositeOperation = 'destination-in'
              let { left, top } = el.getBoundingClientRect()

              let mouseXinCvs = ev.clientX - left
              let mouseYinCvs = ev.clientY - top

              console.log('ctx mode ', ctxMode.current, {
                x: mouseXinCvs,
                y: mouseYinCvs,
              })
              ctx.lineTo(mouseXinCvs, mouseYinCvs)
              ctx.strokeStyle = 'red'
              ctx.lineWidth = 12
              ctx.stroke()
            }
            ctx.restore()
          }
        }

        if (doubleCvs) {
          const mosaicCvs = document.createElement('canvas')
          const mosaicCtx = mosaicCvs.getContext('2d')
          mosaicCvs.width = wd
          mosaicCvs.height = ht
          const mosaicData = toMosaicImageData(el)
          // mosaicCtx.putImageData(mosaicData, 0, 0)

          let isFirstPaint = true
          el.onmouseenter = overEv => {
            el.onmousemove = ev => {
              let { left, top } = el.getBoundingClientRect()
              let mouseXinCvs = ev.clientX - left
              let mouseYinCvs = ev.clientY - top
              console.log('move ', { x: mouseXinCvs, y: mouseYinCvs, wd, ht })
              ctx.drawImage(imgEL, 0, 0, wd, ht, 0, 0, wd, ht)
              mosaicCtx.globalCompositeOperation = 'source-over'
              mosaicCtx.putImageData(mosaicData, 0, 0)
              mosaicCtx.globalCompositeOperation = 'destination-in'
              if (isFirstPaint) {
                mosaicCtx.moveTo(mouseXinCvs, mouseYinCvs)
                isFirstPaint = false
              }
              mosaicCtx.lineWidth = 10
              mosaicCtx.lineTo(mouseXinCvs, mouseYinCvs)
              mosaicCtx.stroke()

              // ctx.putImageData(mosaicData, 0, 0)
              ctx.drawImage(mosaicCvs, 0, 0, wd, ht, 0, 0, wd, ht)
            }
          }
        }
      })
    }
  }

  function toMosaicImageData(canvas: HTMLCanvasElement) {
    // 定义马赛克方格大小（越大越模糊）
    const suquareSize = 10
    const ctx = canvas.getContext('2d')
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let data = imageData.data
    //首先根据宽高遍历整个图片获取到对应的方格
    for (let i = 0; i < canvas.height; i += suquareSize) {
      for (let j = 0; j < canvas.width; j += suquareSize) {
        let totalR = 0
        let totalG = 0
        let totalB = 0
        let totalA = 0
        let count = 0
        //遍历当前方格的每个像素将其RGBA值累加起来
        for (let y = i; y < i + suquareSize && y < canvas.height; y++) {
          for (let x = j; x < j + suquareSize && x < canvas.width; x++) {
            //y * canvas.width + x就能计算出当前像素在整个图片中的索引
            //再乘以4是因为imageData.data每个像素用4个值表示
            //pixelIndex就是当前像素在imageData.data的起始索引也就是它的R值
            let pixelIndex = (y * canvas.width + x) * 4
            totalR += data[pixelIndex]
            totalG += data[pixelIndex + 1]
            totalB += data[pixelIndex + 2]
            totalA += data[pixelIndex + 3]
            count++
          }
        }
        let avgR = totalR / count
        let avgG = totalG / count
        let avgB = totalB / count
        let avgA = totalA / count
        // 遍历的逻辑与上面一模一样，这一步是将方格内的每个像素的RGBA值替换为平均值
        for (let y = i; y < i + suquareSize && y < canvas.height; y++) {
          for (let x = j; x < j + suquareSize && x < canvas.width; x++) {
            let pixelIndex = (y * canvas.width + x) * 4
            data[pixelIndex] = avgR
            data[pixelIndex + 1] = avgG
            data[pixelIndex + 2] = avgB
            data[pixelIndex + 3] = avgA
          }
        }
      }
    }
    return imageData
  }

  useEffect(() => {
    if (cvsEl.current) {
      drawImg(cvsEl.current, { sourceOver: true })
      drawImg(cvsEl2.current, { sourceOverAndDestinationIn: true })

      // 双 canvas 实现马赛克
      drawImg(cvsEl3.current, { doubleCvs: true })
    }
  }, [])

  return (
    <div>
      <div>
        <img src={img} alt="" />
      </div>
      <div>
        <p>原图</p>
        <div dangerouslySetInnerHTML={{ __html: showDataSourceInfo }}></div>
        <br />
        <div>
          <h3>globalCompositeOperation api options test</h3>
          <div>
            type GlobalCompositeOperation = "color" | "color-burn" |
            "color-dodge" | "copy" | "darken" | "destination-atop" |
            "destination-in" | "destination-out" | "destination-over" |
            "difference" | "exclusion" | "hard-light" | "hue" | "lighten" |
            "lighter" | "luminosity" | "multiply" | "overlay" | "saturation" |
            "screen" | "soft-light" | "source-atop" | "source-in" | "source-out"
            | "source-over" | "xor";
          </div>
          <select
            name=""
            id=""
            // value={ctxMode.current}
            defaultValue={ctxMode.current}
            onChange={ev => {
              // console.log(ev.target.value)
              drawImg(cvsEl.current, { sourceOver: true })
              ctxMode.current = ev.target.value
            }}
          >
            <option value="color">"color" </option>
            <option value="color-burn">"color-burn" </option>
            <option value="color-dodge">"color-dodge" </option>
            <option value="copy">"copy" </option>
            <option value="darken">"darken" </option>
            <option value="destination-atop">"destination-atop" </option>
            <option value="destination-in">"destination-in" </option>
            <option value="destination-out">"destination-out" </option>
            <option value="destination-over">"destination-over" </option>
            <option value="difference">"difference" </option>
            <option value="exclusion">"exclusion" </option>
            <option value="hard-light">"hard-light" </option>
            <option value="hue">"hue" </option>
            <option value="lighten">"lighten" </option>
            <option value="lighter">"lighter" </option>
            <option value="luminosity">"luminosity" </option>
            <option value="multiply">"multiply" </option>
            <option value="overlay">"overlay" </option>
            <option value="saturation">"saturation" </option>
            <option value="screen">"screen" </option>
            <option value="soft-light">"soft-light" </option>
            <option value="source-atop">"source-atop" </option>
            <option value="source-in">"source-in" </option>
            <option value="source-out">"source-out" </option>
            <option value="source-over">"source-over" </option>
            <option value="xor">"xor"</option>
          </select>
        </div>
        <canvas ref={cvsEl}></canvas>
      </div>
      <div>
        <canvas ref={cvsEl2}></canvas>
      </div>
      <div>
        <h3>通过 GlobalCompositeOperation 实现马赛克效果</h3>
        <canvas ref={cvsEl3}></canvas>
      </div>
    </div>
  )
}
