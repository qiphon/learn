# webpack pwa

`workbox-webpack-plugin`

```js
// webpack.config.js

{
  plugins: [
    new workboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ]
}
```

```js
// index.js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(
    succe => {
      console.log(succe)
    },
    err => {
      console.log(err)
    },
  )
}
```
