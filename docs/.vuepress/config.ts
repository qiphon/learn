import { defineConfig } from 'vuepress/config'
export default defineConfig({
  title: '齐枫的博客',
  description: '我的学习笔记',
  // base: '/',
  head: [['link', { rel: 'icon', href: '/favorite.ico' }]],
  patterns: ['**/*.md', '**/*.vue', '**/*.html'],
  markdown: {
    lineNumbers: true,
    extractHeaders: ['h2', 'h3'],
  },
  evergreen: true,
})
