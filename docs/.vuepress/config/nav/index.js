module.exports = [
  { text: '首页', link: '/', icon: 'reco-home' },
  { text: '简历', link: 'http://alexlxy.club:8081/', icon: 'reco-blog' },
  { text: '项目经验', 
    icon: 'reco-api',
    items: [
      { text: 'vue电商管理系统', link: 'http://alexlxy.club:8082/', icon: 'reco-api' },
      { text: 'vue小米移动端', link: 'http://alexlxy.club:8083/', icon: 'reco-api' },
    ]
  },
  { text: '时间轴', link: '/timeline/', icon: 'reco-date' },
  { text: '联系方式', 
    icon: 'reco-message',
    items: [
      { text: '关于我', link: '/views/about/', icon: 'reco-account' },
      { text: 'GitHub', link: 'https://github.com/alexlxy', icon: 'reco-github' },
    ]
  }
]