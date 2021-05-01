// 插件配置
module.exports = [
  // 本地插件
  [require('./plugins/love-me'), { // 鼠标点击爱心特效
    excludeClassName: ['mod_404','theme-vdoing-wrapper'] // 要排除元素的class, 默认空[]
  }],
  ['@vuepress/pwa', {
    serviceWorker: true,
    updatePopup: {
      message: "发现新内容可用",
      buttonText: "刷新"
    }
  }],
  [
    "dynamic-title",
    {
      showIcon: "/favicon.ico",
      showText: "(*╹▽╹*)欢迎回来：",
      hideIcon: "/cursor.ico",
      hideText: "o(╥﹏╥)大哥人呢！",
      recoverTime: 2000
    }
  ],
  // 音乐插件
  // ['meting', {
  //   meting: {
  //     server: "netease",
  //     type: "playlist",
  //     mid: "523342770", // 我喜欢的歌单
  //   },          
  //   // 不配置该项的话不会出现全局播放器
  //   aplayer: {
  //     // 吸底模式
  //     fixed: true,
  //     mini: true,
  //     // 自动播放
  //     autoplay: false,
  //     // 歌曲栏折叠
  //     listFolded: true,
  //     // 颜色
  //     theme: '#3eaf7c',
  //     // 播放顺序为随机
  //     order: 'random',
  //     // 初始音量
  //     volume: 1,
  //     // 0：禁用 lrc 歌词，1：lrc 格式的字符串，3：lrc 文件 url
  //     lrcType: 0,
  //   },
  //   mobile :{
  //     // 手机端去掉cover图
  //     cover: false,
  //   }
  // }],
  [
    'one-click-copy',
    {
      // 代码块复制按钮
      copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'], // String or Array
      copyMessage: '复制成功', // default is 'Copy successfully and then paste it for use.'
      duration: 1000, // prompt message display time.
      showInMobile: false, // whether to display on the mobile side, default: false.
    },
  ],
  [
    'demo-block',
    {
      // demo演示模块 https://github.com/xiguaxigua/vuepress-plugin-demo-block
      settings: {
        // jsLib: ['http://xxx'], // 在线示例(jsfiddle, codepen)中的js依赖
        // cssLib: ['http://xxx'], // 在线示例中的css依赖
        // vue: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js', // 在线示例中的vue依赖
        jsfiddle: false, // 是否显示 jsfiddle 链接
        codepen: true, // 是否显示 codepen 链接
        horizontal: false, // 是否展示为横向样式
      },
    },
  ],
  [
    '@vuepress/last-updated', // "上次更新"时间格式
    {
      transformer: (timestamp, lang) => {
        const dayjs = require('dayjs') // https://day.js.org/
        return dayjs(timestamp).format('YYYY/MM/DD HH:mm:ss')
      },
    },
  ],
]
