/* eslint-disable no-proto */
import { addLinkToHead } from './utils'
export function getOneColor () {
  const tagColorArr = [
    '#e15b64',
    '#f47e60',
    '#51b7ec',
    '#f8b26a',
    '#abbd81',
    '#11a8cd',
    '#849b87',
    '#4e6ef2',
    '#ff6600',
    '#8055c8',
    '#5d7282',
    '#f26d6d',
    '#9d39bc',
    '#67cc86',
    '#fb9b5f',
    '#3498db',
    '#c71d24',
    '#fc5531',
    '#ff3a3a',
    '#fb7299',
    '#00a1d6'
  ]
  const index = Math.floor(Math.random() * tagColorArr.length)
  return tagColorArr[index]
}

export function registerCodeThemeCss (theme = 'tomorrow') {
  const themeArr = ['tomorrow', 'funky', 'okaidia', 'solarizedlight', 'default']
  const href = `//prismjs.com/themes/prism${themeArr.indexOf(theme) > -1 ? `-${theme}` : ''}.css`

  addLinkToHead(href)
}

export function interceptRouterError (router) {
  // 获取原型对象上的 push 函数
  const originalPush = router.__proto__.push
  // 修改原型对象中的p ush 方法
  router.__proto__.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
  }
}
