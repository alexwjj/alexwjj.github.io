<template>
  <ModuleTransition delay="0.5">
    <div v-if="visible" class="kxm-weather-wrapper" :style="{ width }">
      <h4 class="weather-title">
        <RecoIcon icon="reco-tongzhi"/>
        <span>{{title}}</span>
        <i class="btn-close" @click="closeKxmWeather">
          <svg t="1573745677073" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4448" width="22" height="22"><path d="M512 34.133333a486.4 486.4 0 1 0 486.4 486.4A486.4 486.4 0 0 0 512 34.133333z m209.4848 632.8064l-55.6032 55.466667-151.517867-151.125333-151.517866 151.1168-55.6032-55.466667 151.517866-151.108267L307.242667 364.714667l55.6032-55.466667 151.517866 151.125333 151.517867-151.1168 55.6032 55.466667-151.517867 151.099733z m0 0" p-id="4449"></path></svg>
        </i>
      </h4>
      <div class="weather-content">
        <iframe width="240" scrolling="no" height="70" frameborder="0" allowtransparency="true" src="https://i.tianqi.com?c=code&id=8&color=%233eaf7c&icon=1&site=14"></iframe>
      </div>
      <div class="weather-footer">
        <div class="tips" v-if="isWechat">公众号：前端技术圈儿，求关注!!!</div>
        <div class="tips" v-else>技术交流、内推、摸鱼等欢迎加V进群</div>
        <div class="qrcode">
          <img v-show="isWechat" :src="$withBase('/img/wx-global.png')" alt="公众号" height="250px">
          <img v-show="!isWechat" :src="$withBase('/img/wechat.png')" alt="微信">
        </div>
        <div class="toggle-qrcode">
          <span class="toggle-1" :class="{'actived': isWechat}" @click="toggleQrcode(true)">公众号</span>
          <span class="toggle-2" :class="{'actived': !isWechat}" @click="toggleQrcode(false)">微信</span>
          <span class="toggle-bg" :class="{'actived': !isWechat}"></span>
        </div>
      </div>
    </div>
  </ModuleTransition>
</template>

<script>
import { ModuleTransition, RecoIcon } from '@vuepress-reco/core/lib/components'

export default {
  name: 'KxmWeather',
  data () {
    return {
      visible: false,
      title: '消息通知',
      width: '260px',
      isWechat: true
    }
  },
  components: { ModuleTransition, RecoIcon },
  mounted () {
    const closeKxmWeather = sessionStorage.getItem('closeKxmWeather')
    this.visible = closeKxmWeather !== 'true'
  },
  methods: {
    // 关闭弹层
    closeKxmWeather () {
      this.visible = false
      sessionStorage.setItem('closeKxmWeather', 'true')
    },
    // 切换二维码
    toggleQrcode(flag) {
      this.isWechat = flag;
    }
  }
}
</script>

<style lang="stylus" scoped>
.kxm-weather-wrapper
  position fixed
  top 80px
  right 20px
  z-index 19
  background #fff
  border 1px solid $accentColor
  border-radius .25rem
  background var(--background-color)
  box-shadow var(--box-shadow)
  &:hover
    box-shadow var(--box-shadow-hover)
  .weather-title
    position relative
    box-sizing border-box
    padding 10px
    margin 0
    background $accentColor
    color #fff
    i
      color #fff
    .btn-close
      position absolute
      display inline-block
      width 22px
      height 22px
      right 10px
      top 0
      bottom 0
      margin auto
      cursor pointer
      svg
        fill #fff
  .weather-content
    padding-left 10px
  .weather-footer
    padding 10px
    .tips
      font-size 14px
      b
        color $accentColor
    .qrcode
      height 240px
      padding 10px 0
      img 
        width 240px
    .toggle-qrcode
      position relative
      height 50px
      span
        position absolute
        top 0
        width 50px
        height 50px
        line-height 50px
        text-align center
        color $accentColor
        font-size 1rem
        cursor pointer
        border-radius 50%
        transition .4s
        &.toggle-1
          left 60px
        &.toggle-2
          left 130px
        &.toggle-bg
          left 60px
          z-index -1
          background-color $accentColor
          box-shadow var(--box-shadow)
          &.actived
            left 130px
        &.actived 
          color #fff !important
</style>
