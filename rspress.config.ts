import { defineConfig } from 'rspress/config'
// import favoriteIcon from './docs/imgs/favorite.ico'

export default defineConfig({
  // 文档根目录
  root: 'docs',
  route: {
    exclude: ['**/demos/**', '**/demo/**', '**/*.js', '**/*.ts', '**/*.tsx'],
  },
  // icon: reqiure('./docs/imgs/favorite.ico'),
})
