const themeConfig = require('./config/theme/')

module.exports = {
  base: '/',
  title: "Alex wjj",
  description: 'Just Do It',
  dest: 'docs/.vuepress/dist',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  theme: 'reco',
  themeConfig,
  codeTheme: 'coy',
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
    ],
    // ['@vuepress-reco/comments', {
    //   solution: 'valine',
    //   options: {
    //     appId: 'vcfdlxv9vEKeHDQT1bEaLVaG-gzGzoHsz',// your appId
    //     appKey: 'E0Ae8xnQUmiCUesRH42CA48H', // your appKey
    //   }
    // }],
    // ['@vuepress-reco/vuepress-plugin-bulletin-popover', {
    //   // width: '300px', // 默认 260px
    //   title: '个人微信:18697737169',
    //   body: [
    //     // {
    //     //   type: 'title',
    //     //   content: '',
    //     //   style: 'text-aligin: center;'
    //     // },
    //     {
    //       type: 'image',
    //       src: '/wechat.jpeg'
    //     }
    //   ],
    //   // footer: [
    //   //   {
    //   //     type: 'button',
    //   //     text: '微信',
    //   //     link: '/wechat.jpeg'
    //   //   },
    //   //   {
    //   //     type: 'button',
    //   //     text: '支付宝',
    //   //     link: '/alipay.jpeg'
    //   //   }
    //   // ]
    // }]
  ] 
}  