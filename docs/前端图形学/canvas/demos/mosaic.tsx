/**
 * @file 马赛克 demo
 */

import { useEffect, useRef, useState } from 'react'
import img from '../../../imgs/flutter_lifecycle.png'

export const Mosaic = () => {
  const cvsEl = useRef<HTMLCanvasElement>()
  const cvsEl2 = useRef<HTMLCanvasElement>()

  const [showDataSourceInfo, setShowDataSourceInfo] = useState('')

  const initCvs = (el, imgWidth, imgHeight) => {
    el.setAttribute('style', `width: ${imgWidth}px;height: ${imgHeight}px;`)
    el.width = imgWidth
    el.height = imgHeight
  }

  const drawImg = (
    el: HTMLCanvasElement,
    { getImgData, toMosaic }: { getImgData?: boolean; toMosaic?: boolean },
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

        if (toMosaic) {
          const imgData = ctx.getImageData(0, 0, wd, ht)
          const chunkSquareWidth = 8
          const chunkSize = Math.pow(chunkSquareWidth, 2)
          const dataLen = imgData.data.length

          // 显示马赛克信息
          setShowDataSourceInfo(
            `
                    mosaic chunkSize is: ${chunkSize} <br />
                    canvas dataSource length is: ${dataLen} <br />
                    canvas width * canvas height * 4 = ${wd * ht * 4}
                `,
          )
          // 以下可以放到 worker 中去计算
          // 马赛克数据块数量
          const xChunkLen = Math.ceil(wd / chunkSquareWidth)
          const yChunkLen = Math.ceil(ht / chunkSquareWidth)

          // 循环马赛克块
          for (let y = 0; y < yChunkLen; y++) {
            for (let x = 0; x < xChunkLen; x++) {
              const isXLast = x === xChunkLen - 1
              const isYLast = y === yChunkLen - 1

              // 记录颜色汇总
              let cubeR = 0
              let cubeG = 0
              let cubeB = 0
              let cubeA = 0
              // 计算行的高度
              const chunkYHeight =
                ht % chunkSquareWidth > 0 && isYLast
                  ? ht % chunkSquareWidth
                  : chunkSquareWidth

              // 计算列的宽度
              const chunkXWidth =
                (wd / 4) % chunkSquareWidth > 0 && isXLast
                  ? wd % chunkSquareWidth
                  : chunkSquareWidth
              // 第 y 行起始/结束点坐标
              const rowYStartPoint = y * chunkSquareWidth * wd * 4

              // 第 n 行，第 n 块的横向增加值
              const addX = x * 4 * chunkSquareWidth
              /**
               * 横向便利
               */
              for (let squareY = 0; squareY < chunkYHeight; squareY++) {
                const addY = squareY * wd * 4
                for (let squareX = 0; squareX < chunkXWidth; squareX++) {
                  const currentX = squareX * 4
                  const startPoint = rowYStartPoint + addX + addY + currentX
                  // continue
                  const R = imgData.data[startPoint]
                  const G = imgData.data[startPoint + 1]
                  const B = imgData.data[startPoint + 2]
                  const A = imgData.data[startPoint + 3]
                  cubeA += A
                  cubeR += R
                  cubeG += G
                  cubeB += B
                }
              }
              // // 平均值
              const averageR = cubeR / chunkSize
              const averageG = cubeG / chunkSize
              const averageB = cubeB / chunkSize
              const averageA = cubeA / chunkSize
              // 平均值放回去
              for (let squareY = 0; squareY < chunkYHeight; squareY++) {
                const addY = squareY * wd * 4
                for (let squareX = 0; squareX < chunkXWidth; squareX++) {
                  const currentX = squareX * 4
                  const startPoint = rowYStartPoint + addX + addY + currentX
                  imgData.data[startPoint] = averageR
                  imgData.data[startPoint + 1] = averageG
                  imgData.data[startPoint + 2] = averageB
                  imgData.data[startPoint + 3] = averageA
                }
              }
            }
            ctx.putImageData(imgData, 0, 0)
          }
          // el.onclick = ev => {
          //   const { offsetLeft, offsetTop } = ev.target
          //   const x = ev.pageX - offsetLeft
          //   const y = ev.pageY - offsetTop

          // }
        }
      })

      if (getImgData) {
        el.onclick = ev => {
          const { offsetLeft, offsetTop } = ev.target
          const x = ev.pageX - offsetLeft
          const y = ev.pageY - offsetTop
          const imgData = ctx.getImageData(0, 0, wd, ht)
          console.log(imgData, { x, y })
          const chunkSquareWidth = 12
          let totalA = 0
          let totalR = 0
          let totalG = 0
          let totalB = 0
          // mosaic 处理点击区域
          const startPointY = y - chunkSquareWidth / 2
          const startPointX = x - chunkSquareWidth / 2

          const startPointInArr = startPointY * wd * 4 + startPointX * 4

          for (let squareY = 0; squareY < chunkSquareWidth; squareY++) {
            const addY = squareY * wd * 4
            for (let squareX = 0; squareX < chunkSquareWidth; squareX++) {
              const addX = squareX * 4
              const currentPoint = startPointInArr + addX + addY
              totalR += imgData.data[currentPoint]
              totalG += imgData.data[currentPoint + 1]
              totalB += imgData.data[currentPoint + 2]
              totalA += imgData.data[currentPoint + 3]
            }
          }
          console.log('write to canvas')
          const totalPoints = Math.pow(chunkSquareWidth, 2)
          const averageA = totalA / totalPoints
          const averageR = totalR / totalPoints
          const averageG = totalG / totalPoints
          const averageB = totalB / totalPoints

          for (let squareY = 0; squareY < chunkSquareWidth; squareY++) {
            const addY = squareY * wd * 4
            for (let squareX = 0; squareX < chunkSquareWidth; squareX++) {
              const addX = squareX * 4
              const currentPoint = startPointInArr + addX + addY
              imgData.data[currentPoint] = averageR
              imgData.data[currentPoint + 1] = averageG
              imgData.data[currentPoint + 2] = averageB
              imgData.data[currentPoint + 3] = averageA
            }
          }

          ctx.putImageData(imgData, 0, 0)
        }
      }
    }
  }

  useEffect(() => {
    if (cvsEl.current) {
      drawImg(cvsEl.current, { getImgData: true })
      drawImg(cvsEl2.current, { toMosaic: true })
    }
  }, [])

  return (
    <div>
      <div>
        马赛克，指现行广为使用的一种图像处理手段，此手段将影像特定区域的色阶细节劣化并造成色块打乱的效果，因为这种模糊看上去有一个个的小格子组成，便形象的称这种画面为马赛克。其目的通常是使之无法辨认。
        <br />
        马赛克图由一个个色块构成。单个色块内仅有一种颜色。算法的核心原理非常简单，通过循环的方式获取到当前色块位置所对应的所有原始像素点，将这些像素点的平均色值用于色块。
      </div>
      <div>
        <img src={img} alt="" />
      </div>
      <div>
        <p>点击下面的 canva 就可以在控制台看到 image data (`number[]`)</p>
        <code>canvasImgData = canvasWidth * canvasHeight * 4</code>
        <div dangerouslySetInnerHTML={{ __html: showDataSourceInfo }}></div>
        <br />
        <p>点击下面的图片，会自动在点击处打码</p>
        <canvas id="cvs" ref={cvsEl}></canvas>
      </div>
      <div>
        <p>全图打码后效果如下</p>
        <canvas id="cvs2" ref={cvsEl2}></canvas>
      </div>
    </div>
  )
}
