import { defineConfig } from 'rspress/config'

export default defineConfig({
  title: 'qiphon 博客',
  description: '前端笔记,个人学习资料',
  // 文档根目录
  root: 'docs',
  base: '/',
  route: {
    exclude: ['**/demos/**', '**/demo/**', '**/*.js', '**/*.ts', '**/*.tsx'],
  },
  // favorite icon
  icon: '/imgs/favorite.ico',
  logo: '/imgs/favorite.ico',
})
