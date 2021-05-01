const head = require('./config/head.js');
const plugins = require('./config/plugins.js');
const themeConfig = require('./config/themeConfig.js');

module.exports = {
  title: "俊劫的学习基地",
  base: '/', // 格式：'/<部署仓库名>/'， 默认'/'
  description: "俊劫的学习基地是俊劫的个人博客，用于记录学习笔记、分享音乐、书籍、旅行等个人兴趣的站点。",
  dest: "public",
  theme: require.resolve('../../theme-reco-vdoing'), // 使用本地主题
  markdown: {
    lineNumbers: true // 代码行号
  },
  head,
  plugins,
  themeConfig
}