<template>
  <canvas ref="canvas" style="position: absolute;top: 0;left: 0;"></canvas>
</template>
<script>
if (typeof window !== 'undefined') {
  require('comutils/animationFrame')()
}
import resize from '../../util/resize'
const copyObj = require('comutils/copyObj')
export default {
  name: 'bubblesEffect',
  data () {
    return {
      circles: [],
      requestAniId: null
    }
  },
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    opts () {
      return copyObj({}, {
        color: 'rgba(225,225,225,0.5)',
        radius: 15,
        densety: 0.3,
        clearOffset: 0.2
      }, this.options)
    }
  },
  methods: {
    randomColor () {
      let r = Math.floor(Math.random() * 255)
      let g = Math.floor(Math.random() * 255)
      let b = Math.floor(Math.random() * 255)
      let alpha = Math.random().toPrecision(2)
      let rgba = `rgba(${r}, ${g}, ${b}, ${alpha})`
      return rgba
    }
  },
  mounted () {
    let width, height, canvas, ctx, circles = [], settings = this.opts, that = this
    initContainer()

    function initContainer () {
      width = window.innerWidth
      height = window.innerHeight
      canvas = that.$refs.canvas
      canvas.width = width
      canvas.height = height
      ctx = canvas.getContext('2d')
      for (let x = 0; x < width * settings.densety; x++) {
        let c = new Circle()
        circles.push(c)
      }
      animate()
    }

    function animate () {
      cancelAnimationFrame(self.requestAniId)
      ctx.clearRect(0, 0, width, height)
      for (let i in circles) {
        circles[i].draw()
      }
      self.requestAniId = requestAnimationFrame(animate)
    }

    function Circle () {
      var self = this
      this.pos = {}
      init()

      function init () {
        self.pos.x = Math.random() * width
        self.pos.y = height + Math.random() * 100
        self.alpha = 0.1 + Math.random() * settings.clearOffset
        self.scale = 0.1 + Math.random() * 0.3
        self.speed = Math.random()
        self.color = settings.color === 'random' ? that.randomColor() : settings.color
      }

      this.draw = function () {
        if (self.alpha <= 0) {
          init();
        }
        self.pos.y -= self.speed
        self.alpha -= 0.0005
        ctx.beginPath()
        ctx.arc(self.pos.x, self.pos.y, self.scale * settings.radius, 0, 2 * Math.PI, false)
        ctx.fillStyle = self.color
        ctx.fill()
        ctx.closePath()
      };
    }

    resize(() => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    })
  },
  beforeDestroy () {
    cancelAnimationFrame(this.requestAniId)
  }
}
</script>