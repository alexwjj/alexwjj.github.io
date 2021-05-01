const { path } = require('@vuepress/shared-utils')

module.exports = (options, context) => ({
  name: 'BubblesEffect',
  enhanceAppFiles: [
    path.resolve(__dirname, './src/components/bubbles/index.js')
  ]
})