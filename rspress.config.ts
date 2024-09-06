import { defineConfig } from 'rspress/config'
import { Script } from 'vm'

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
  head: [
    // [
    //   'script',
    //   {
    //     src: '/st/googleAnalytics/tagManager.js',
    //     defer: 'true',
    //     content: '',
    //   },
    // ],
    ['meta', { name: 'baidu-site-verification', content: 'code-rVojedTfCY' }],
    ['meta', { name: 'author', content: 'qiphon' }],
    ['meta', { name: 'description', content: 'qiphon 的前端学习笔记' }],
    [
      'meta',
      {
        name: 'keywords',
        content: '前端,学习,front-end,html,js,ts,vue,react,nginx,canvas',
      },
    ],
  ],
  builderConfig: {
    html: {
      tags: [
        {
          tag: 'script',
          attrs: {
            src: '/st/googleAnalytics/tagManager.js',
            defer: true,
          },
        },
      ],
    },
  },
  themeConfig: {
    // nav: [
    //   {
    //     text: '我的',
    //     items: [
    //       // {
    //       //   text: '其它资料',
    //       //   items: [
    //       //     {
    //       //       text: 'Github',
    //       //       link: 'http://github.com/qiphon',
    //       //     },
    //       //   ],
    //       // },
    //       {
    //         text: '首页',
    //         link: '/',
    //       },
    //       {
    //         text: 'csdn',
    //         link: 'https://qiphon.blog.csdn.net/',
    //       },
    //     ],
    //     position: 'right',
    //   },
    // ],
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'http://github.com/qiphon',
      },
      {
        icon: { svg: '<img src="/imgs/csdn.svg"/>' },
        mode: 'link',
        content: 'https://qiphon.blog.csdn.net/',
      },
    ],
    // sidebar: {
    //   '/guide/': [
    //     {
    //       text: 'Getting Started',
    //       items: [
    //         // 填入一个对象
    //         {
    //           text: 'Introduction',
    //           link: '/guide/getting-started/introduction',
    //         },
    //         {
    //           text: 'Installation',
    //           link: '/guide/getting-started/installation',
    //         },
    //       ],
    //     },
    //   ],
    // },
    footer: { message: 'https://qiphon.blog.csdn.net/' },
    lastUpdated: true,
    outlineTitle: '本页主要内容',
    outline: true,
  },
})
