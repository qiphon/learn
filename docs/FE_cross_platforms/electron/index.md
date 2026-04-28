# electron 

## 常见问题

- 多窗口渲染异常，灰屏 backgroundThrottling false

## overlay 操作失效（最小化恢复）

```ts
const reDraw = (win: BrowserWindow) => {
    const {w, h} = win.getSize()

    win.setSize(w+1, h)

    setTimeout(()=> {
        win.setSize(w, h)
    }, 200)

}

mainWin.on( 'restore',() => {
    main.webContents.send('visibility-change', 'visible')
    overlayWin.showInactive()

    mainWin.setAlwaysOnTop(true)
    overlayWin.setAlwaysOnTop(true)

    setTimeout(()=> {
        mainWin.setAlwaysOnTop(false)
        overlayWin.setAlwaysOnTop(false)
        reDraw(overlayWin)
    }, 100)
})
```