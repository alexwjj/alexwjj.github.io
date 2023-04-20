// nav
module.exports = [
  { text: '首页', link: '/', icon: 'reco-home' },
  {
    text: '前端',
    link: '',
    icon: '',
    items: [
      {
        text: '文档教程',
        items: [
          { text: '资源导航', link: '/web/docs/nav/', icon: 'reco-blog' },
          { text: 'AI', link: '/web/docs/ai/', icon: 'reco-blog' },
          { text: '2022前端面试精华', link: '/web/docs/alexwjj/fe-study/', icon: 'reco-blog' },
          { text: 'ES6 入门教程', link: '/web/docs/es6/', icon: 'reco-blog' },
          { text: '网道-JavaScript 教程', link: '/web/docs/wangdoc/javascript/', icon: 'reco-blog' },
          { text: 'Angular 文档', link: '/web/docs/angular/', icon: 'reco-blog' },
          { text: 'React 文档', link: '/web/docs/react/', icon: 'reco-blog' },
          { text: 'Vue 文档', link: '/web/docs/vue/', icon: 'reco-blog' },
          { text: 'Node 文档', link: '/web/docs/node/', icon: 'reco-blog' },
          { text: 'Babel 文档', link: '/web/docs/babel/', icon: 'reco-blog' },
          { text: 'Webpack 文档', link: '/web/docs/webpack/', icon: 'reco-blog' },
          { text: 'TypeScript 文档', link: '/web/docs/typescript/', icon: 'reco-blog' },
          { text: '菜鸟教程', link: '/web/docs/runoob/', icon: 'reco-blog' },
          { text: '印记中文', link: '/web/docs/docschina/', icon: 'reco-blog' },
        ]
      }
    ]
  },

  {
    text: '索引',
    icon: 'reco-api',
    items: [
      { text: '分类', link: '/categories/', icon: 'reco-category' },
      { text: '标签', link: '/tags/', icon: 'reco-tag' },
      { text: '归档', link: '/archives/', icon: 'reco-date' },
    ]
  },
  { text: '留言板', link: '/bookshop/message-board/', icon: 'reco-suggestion' },
  { text: 'AI导航', link: '/web/docs/ai/', icon: 'reco-api' },
  { text: '资源导航', link: '/web/docs/nav/', icon: 'reco-api' },
  {
    text: '关于',
    icon: 'reco-message',
    items: [
      {
        text: '联系',
        items: [
          { text: 'GitHub', link: 'https://github.com/alexwjj', icon: 'reco-github' },
          { text: '关于我', link: '/bookshop/linkme/', icon: 'reco-account' },
        ]
      }, {
        text: '博客',
        items: [
          { text: '本站源码', link: 'https://github.com/alexwjj/alexwjj.github.io', icon: 'reco-document' },
          { text: '老版博客', link: 'https://alexwjj.github.io/old-blog', icon: 'reco-document' },
        ]
      }, {
        text: '其他',
        items: [
          { text: '友情链接', link: '/bookshop/friendslink/', icon: 'reco-friend' },
        ]
      },
    ]
  }
]
