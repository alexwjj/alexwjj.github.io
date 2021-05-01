const path= require('path');
const LoveMyPlugin = (options={}) => ({
  define () {
    const EXCLUDECLASS = options.excludeClassName || []
    return {EXCLUDECLASS}
  },
  enhanceAppFiles: [
    path.resolve(__dirname, 'love-me.js')
  ]
});
module.exports = LoveMyPlugin;
