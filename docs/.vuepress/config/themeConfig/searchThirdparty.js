/**
 * searchThirdparty：第三方搜索链接的搜索框
 * 配置：
 *  title: '', // 显示的标题
 *  frontUrl：'', // 搜索链接的前面部分
 *  behindUrl: '', // 搜索链接的后面部分，可选，默认 ''
 * */ 
module.exports = [
  {
    title: '在 github 中搜索',
    frontUrl: 'https://github.com/search?q='
  },
  {
    title: '在 掘金 中搜索',
    frontUrl: 'https://juejin.cn/search?query='
  },
  {
    title: '在 Bing 中搜索',
    frontUrl: 'https://cn.bing.com/search?q='
  },
  {
    title: '在 MDN 中搜索',
    frontUrl: 'https://developer.mozilla.org/zh-CN/search?q='
  },
  {
    title: '在 npm 中搜索',
    frontUrl: 'https://www.npmjs.com/search?q='
  },
  {
    title: '在 哔哩哔哩 中搜索',
    frontUrl: 'https://search.bilibili.com/all?keyword='
  }
]
