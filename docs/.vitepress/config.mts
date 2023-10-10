import { defineConfigWithTheme } from 'vitepress'
import path from 'path' 

export default defineConfigWithTheme({
  title: '齐枫的博客',
  description: '我的学习笔记',
  // base: '/',
  head: [['link', { rel: 'icon', href: '/favorite.ico' }]],
  markdown: {
    lineNumbers: true
  },
  srcDir: path.resolve(__dirname, '../')
})
