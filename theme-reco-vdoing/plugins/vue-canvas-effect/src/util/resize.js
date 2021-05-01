const throttle = require('comutils/throttle')
const resize = (calback, delay) => {
  window.addEventListener('resize', throttle(calback, delay));
}

export default resize