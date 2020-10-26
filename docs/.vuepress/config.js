const themeConfig = require('./config/theme/')

module.exports = {
  base: '/',
  title: "Alex Lxy",
  description: '种一棵树，最好的时机是十年前，其次是现在',
  dest: 'docs/.vuepress/dist',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  theme: 'reco',
  themeConfig,
  markdown: {
    lineNumbers: true
  },
  plugins: [
    '@vuepress/medium-zoom',
    'flowchart',
    '@vuepress-reco/vuepress-plugin-loading-page',
    // 看板娘
    // [
    //   "@vuepress-reco/vuepress-plugin-kan-ban-niang",
    //   {
    //     theme: ["z16"],
    //     clean: true,
    //     modelStyle: {
    //       position: "fixed",
    //       right: "0px",
    //       bottom: "0px",
    //       opacity: "0.9",
    //       zIndex: 99999
    //     }
    //   }
    // ],
    // 鼠标点击特效
    [
      "cursor-effects",
      {
        size: 2,                    // size of the particle, default: 2
        shape: ['circle'],  // shape of the particle, default: 'star'， 可选'circle'
        zIndex: 999999999           // z-index property of the canvas, default: 999999999
      }
    ],
    // // 动态标题
    [
      "dynamic-title",
      {
        showIcon: "/favicon.ico",
        showText: "(/≧▽≦/)老板好！",
        hideIcon: "/failure.ico",
        hideText: "(●—●)快快回来！",
        recoverTime: 2000
      }
    ]
  ] 
}  