<template>
  <div class="mode-options">
    <h4 class="title">选择模式</h4>
    <ul class="color-mode-options">
      <li
        v-for="(mode, index) in modeOptions"
        :key="index"
        :class="getClass(mode.mode)"
        @click="selectMode(mode.mode)"
      >{{ mode.title }}</li>
    </ul>
  </div>
</template>

<script>
import applyMode from './applyMode'
export default {
  name: 'ModeOptions',

  data () {
    return {
      modeOptions: [
        { mode: 'dark', title: '深色模式' },
        { mode: 'light', title: '浅色模式' },
        { mode: 'read', title: '阅读模式' }
      ],
      currentMode: 'light'
    }
  },

  mounted () {
    // modePicker 开启时默认使用用户主动设置的模式
    this.currentMode = localStorage.getItem('mode') || this.$themeConfig.mode || 'light'

    // Dark and Light read switches
    // 为了避免在 server-side 被执行，故在 Vue 组件中设置监听器
    var that = this
    window.matchMedia('(prefers-color-scheme: dark)').addListener(() => {
      that.$data.currentMode === 'light' && applyMode(that.$data.currentMode)
    })
    window.matchMedia('(prefers-color-scheme: light)').addListener(() => {
      that.$data.currentMode === 'light' && applyMode(that.$data.currentMode)
    })

    applyMode(this.currentMode)
  },

  methods: {
    selectMode (mode) {
      if (mode !== this.currentMode) {
        this.currentMode = mode
        applyMode(mode)
        localStorage.setItem('mode', mode)
      }
    },
    getClass (mode) {
      return mode !== this.currentMode ? mode : `${mode} active`
    }
  }
}
</script>

<style lang="stylus">
.mode-options
  background-color var(--background-color)
  min-width: 125px;
  margin: 0;
  padding: 1em;
  box-shadow var(--box-shadow);
  border-radius: $borderRadius;
  .title
    margin-top 0
    margin-bottom .6rem
    font-weight bold
    color var(--text-color)
  .color-mode-options
    display: flex;
    flex-wrap no-wrap
    li
      text-align: center;
      font-size 12px
      color var(--text-color)
      line-height 18px
      margin-right 5px
      padding 3px 6px
      border 1px solid #ddd
      border-radius: $borderRadius
      background-color var(--background-color)
      cursor pointer
      &.active
        border-color $accentColor
        background-color: $accentColor;
        color #fff
      &:last-child
        margin-right 0
</style>
