const path = require('path')

const setFrontmatter = require('./node_utils/setFrontmatter')
const getSidebarData = require('./node_utils/getSidebarData')
const { createPage, deletePage } = require('./node_utils/handlePage')
const chalk = require('chalk') // 命令行打印美化
const yaml = require('js-yaml') // yaml转js
const log = console.log

// md容器名
const CARD_LIST = 'cardList'
const CARD_IMG_LIST = 'cardImgList'

// 渲染md容器的卡片列表
function renderCardList (tokens, idx, type) {
  const END_TYPE = `container_${type}_close`,
    _tokens$idx = tokens[idx],
    nesting = _tokens$idx.nesting,
    info = _tokens$idx.info;

  if (nesting === 1) { // 渲染开头的 ':::' 标记
    let yamlStr = '';

    for (let i = idx; i < tokens.length; i++) {
      let _tokens$i = tokens[i],
        type = _tokens$i.type,
        content = _tokens$i.content,
        _info = _tokens$i.info;
      if (type === END_TYPE) break; // 遇到结束的 ':::' 时
      if (!content) continue;
      if (type === 'fence' && _info === 'yaml') { // 是代码块类型，并且是yaml代码
        yamlStr = content
      }
    }

    if (yamlStr) { // 正确解析出yaml字符串后
      const dataObj = yaml.safeLoad(yamlStr) // 将yaml字符串解析成js对象
      let dataList = []

      if (dataObj) { // 正确解析出数据对象
        dataList = Array.isArray(dataObj) ? dataObj : dataObj.list
      }

      if (dataList && dataList.length) { // 有列表数据

        // 每行显示几个
        let row = Number(info.split(' ').pop())
        if (!row || row > 4 || row < 1) {
          row = 3 // 默认 3
        }

        let listDOM = ''
        if (type === CARD_LIST) { // 普通卡片列表
          listDOM = getCardListDOM(dataList, row)
        } else if (type === CARD_IMG_LIST) { // 卡片图片列表
          listDOM = getCardImgListDOM(dataList, row)
        }

        return `<div class="${type}Container"><div class="card-list">${listDOM}</div>`
      }
    }
  } else { // 渲染':::' 结尾
    return '</div>'
  }
}


// 将数据解析成DOM结构 - 普通卡片列表
function getCardListDOM (dataList, row) {
  let listDOM = ''
  dataList.forEach(item => {
    listDOM += `
      <${item.link ? 'a href="' + item.link + '" target="_blank"' : 'span'} class="card-item ${row ? 'row-' + row : ''}"
         style="${item.bgColor ? 'background-color:' + item.bgColor + ';--randomColor:' + item.bgColor + ';' : ''}${item.textColor ? 'color:' + item.textColor + ';' : ''}"
      >
        ${item.avatar ? '<img src="' + item.avatar + '" class="no-zoom">' : ''}
        <div>
          <p class="name">${item.name}</p>
          <p class="desc" title="${item.desc}">${item.desc}</p>
        </div>
      </${item.link ? 'a' : 'span'}>
    `
  })
  return listDOM
}


// 将数据解析成DOM结构 - 图文卡片列表
function getCardImgListDOM (dataList, row) {
  let listDOM = ''
  dataList.forEach(item => {
    listDOM += `
      <div class="card-item ${row ? 'row-' + row : ''}" >
        <a href="${item.link}" target="_blank">
          <div class="box-img">
              <img src="${item.img}" class="no-zoom">
          </div>
          <div class="box-info">
              <p class="name">${item.name}</p>
              ${item.desc ? `<p class="desc">${item.desc}</p>` : ''}
          </div>

          ${item.avatar || item.author ? `<div class="box-footer">
              ${item.avatar ? `<img src="${item.avatar}" class="no-zoom">` : ''}
              ${item.author ? `<span>${item.author}</span>` : ''}
          </div>`: ''}
        </a>
      </div>
    `
  })
  return listDOM
}

// Theme API.
module.exports = (options, ctx) => {
  const { sourceDir, themeConfig, siteConfig } = ctx

  // 自动设置front matter
  setFrontmatter(sourceDir, themeConfig)

  // 自动生成结构化侧边栏
  const sidebar = themeConfig.sidebar
  log(chalk.blue('tip ') + chalk.green('sidebar。', sidebar))
  if (sidebar === 'structuring' || sidebar && sidebar.mode === 'structuring') {
    const collapsable = themeConfig.sidebar.collapsable === false ? false : true
    const sidebarData = getSidebarData(sourceDir, collapsable)
    if (sidebarData) {
      themeConfig.sidebar = sidebarData
      log(chalk.blue('tip ') + chalk.green('add sidebar data. 侧边栏数据成功生成。'))
    } else {
      themeConfig.sidebar = 'auto'
      log(chalk.yellow('warning: fail to add sidebar data, switch to "auto". 未能添加侧边栏数据，将切换为“auto”。'))
    }
  }

  // 分类页
  if (themeConfig.category !== false) {
    createPage(sourceDir, 'categoriesPage')
  } else {
    deletePage(sourceDir, 'categoriesPage')
  }

  // 标签页
  if (themeConfig.tag !== false) {
    createPage(sourceDir, 'tagsPage')
  } else {
    deletePage(sourceDir, 'tagsPage')
  }

  // 归档页
  if (themeConfig.archive !== false) {
    createPage(sourceDir, 'archivesPage')
  } else {
    deletePage(sourceDir, 'archivesPage')
  }

  return ({
    alias () {
      // resolve algolia
      const isAlgoliaSearch = (
        themeConfig.algolia ||
        Object.keys(siteConfig.locales && themeConfig.locales || {})
          .some(base => themeConfig.locales[base].algolia)
      )
      return {
        '@AlgoliaSearchBox': isAlgoliaSearch
          ? path.resolve(__dirname, 'components/AlgoliaSearchBox.vue')
          : path.resolve(__dirname, 'noopModule.js'),
        '@SearchBox': path.resolve(__dirname, 'components/SearchBox.vue')
      }
    },
  
    plugins: [
      '@vuepress-reco/back-to-top',
      require('./plugins/kxm-loading-page'),
      require('./plugins/count-to'),
      require('./plugins/vue-canvas-effect'),
      '@vuepress-reco/pagation',
      '@vuepress-reco/comments',
      '@vuepress/active-header-links',
      ['@vuepress/medium-zoom', {
        selector: '.theme-reco-content :not(a) > img'
      }],
      '@vuepress/plugin-nprogress',
      'vuepress-plugin-smooth-scroll',
      ['container', {
        type: 'tip',
        before: info => `<div class="custom-block tip"><p class="title">${info}</p>`,
        after: '</div>',
        defaultTitle: ''
      }],
      ['container', {
        type: 'warning',
        before: info => `<div class="custom-block warning"><p class="title">${info}</p>`,
        after: '</div>',
        defaultTitle: ''
      }],
      ['container', {
        type: 'danger',
        before: info => `<div class="custom-block danger"><p class="title">${info}</p>`,
        after: '</div>',
        defaultTitle: ''
      }],
      ['container', {
        type: 'right',
        defaultTitle: ''
      }],
      ['container', {
        type: 'theorem',
        before: info => `<div class="custom-block theorem"><p class="title">${info}</p>`,
        after: '</div>',
        defaultTitle: ''
      }],
      ['container', {
        type: 'details',
        before: info => `<details class="custom-block details">${info ? `<summary>${info}</summary>` : ''}\n`,
        after: () => '</details>\n',
        defaultTitle: {
          '/': '查看更多',
          '/zh/': '更多'
        }
      }],
      // 卡片列表
      ['container', {
          type: CARD_LIST,
          render: (tokens, idx) => {
            // tokens 是整个md文件的虚拟dom结构数组
            // idx 是tokens中':::' 所在的索引，而且是当前指定type的':::'，分别有开始和结束两次的idx
            // if (tokens[idx].nesting === 1) { // 开头的 ':::' 标记
            // } else { // 结束的 ':::' 标记
            // }
            // 注意：修改这里面的代码后需要在md文件保存一下才会重新执行渲染
            return renderCardList(tokens, idx, CARD_LIST)
          }
        },
      ],
      // 图文卡片列表
      ['container', {
          type: CARD_IMG_LIST,
          render: (tokens, idx) => {
            return renderCardList(tokens, idx, CARD_IMG_LIST)
          }
        },
      ],
    ]
  })
}