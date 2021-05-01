const { path } = require('@vuepress/shared-utils')

module.exports = (options, context) => ({
  name: 'CountTo',
  enhanceAppFiles: [
    path.resolve(__dirname, './bin/enhanceAppFile.js')
  ]
})