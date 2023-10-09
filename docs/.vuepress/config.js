module.exports = {
    title: '齐枫的博客',
    descript: '我的学习笔记',
    base: '/',
    markdown: {
        lineNumbers: true
    },
    head: [
        ['link', { rel: 'icon', href: '/favorite.ico' }]
    ],
    themeConfig: {
        repo: 'qiphon/yd-learn',
        repoLabel: '查看源码',
        docsDir: '/',
        // 假如文档放在一个特定的分支下：
        docsBranch: 'master',
        nav: [
            {
                text: "首页",
                link: "/"
            },
            {
                text: "关于我",
                link: "/about/aboutme"
            },
        ],
        search: true,
        searchMaxSuggestions: 10,
        // 默认情况下，侧边栏只会显示由当前活动页面的标题（headers）组成的链接，你可以将 themeConfig.displayAllHeaders 设置为 true 来显示所有页面的标题链接
        displayAllHeaders: true,
        activeHeaderLinks: true, // 默认值：true
        // 侧边栏  
        sidebar: "auto",
        lastUpdated: 'Last Updated', // string | boolean
    },
}