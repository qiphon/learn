# webpack build speed

- upgrage node / webpack
- 尽量减少 loader 和 loader 配置 (exclude or include)
- 尽可能少的使用 plugin
- resolve 参数合理配置
  ```js
  // webpack.config.js
  {
    //...
    resolve: {
      extensions: ['tsx', 'jsx', 'js'],
      mainFiles: ['index'],
      alias: {
        "@": path.resolve(__dirname, './src')
      }
    }
  }
  ```
- dllplugin

  - 编译第三方库为 dll
  - 通过 manifest.json 在项目中做关联 `webpack.Dllplugin addAssethtmlwebpackplugin webpack.DllReferencePlugin`
    - 将要打包成 dll 的文件单独编译
      ```js
      // webpack.dll.config.js
      module.exports = {
        mode: 'production',
        entry: {
          vendors: ['lodash'],
          react: ['react', 'react-dom'],
        },
        output: {
          filename: '[name].dll.js',
          path: path.resolve(__dirname, './dist/dll'),
          library: '[name]',
        },
        plugins: [
          new webpack.DllPlugin({
            name: ['name'],
            path: path.resolve(__dirname, 'dist/dll/[name].manifest.json'),
          }),
        ],
      }
      ```
    - 打包时引用 dll 文件

- 控制包文件大小

- 多线程 threadLoader happyPack

- sourceMap 合理选择

- 结合 analyse 分析打包结果

- 开发环境内存编译

- 开发环境无用插件剔除
