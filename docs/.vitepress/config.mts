import { defineConfigWithTheme } from 'vitepress'

export default defineConfigWithTheme({
  title: '齐枫的博客',
  description: '我的学习笔记',
  // base: '/',
  head: [['link', { rel: 'icon', href: '/favorite.ico' }]],
  markdown: {
    lineNumbers: true
  },
})
