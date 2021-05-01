<template>
  <div class="friend-link-wrapper">
    <div
      class="friend-link-item"
      v-for="(item, index) in dataAddColor"
      :key="index"
      @mouseenter="showDetail($event)"
      @mouseleave="hideDetail($event)"
      target="_blank">
      <span
        class="list-style"
        :style="{ 'backgroundColor': item.color }">
      </span>
      {{item.title}}
      <transition name="fade">
        <div class="popup-window-wrapper">
          <div
            class="popup-window"
            :style="popupWindowStyle"
            ref="popupWindow">
            <div class="info">
              <div class="title-box">
                <div class="title">
                  <reco-icon icon="reco-friend" :style="{ color: iconColor }"/>
                  <span>{{item.title}}</span>
                </div>
                <a class="btn-go"
                  :style="{ 'backgroundColor': item.color }"
                  :href="item.link"
                  target="_blank">前往</a>
              </div>
              <div v-if="item.desc">{{ item.desc }}</div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="more">
      <router-link to="/bookshop/friendslink/">
        <i class="fas fa-angle-double-right"></i>前往更多 ...
      </router-link>
    </div>
  </div>
</template>

<script>
import { getOneColor } from '@theme/helpers/other'
import { RecoIcon } from '@vuepress-reco/core/lib/components'

export default {
  data () {
    return {
      iconColor: '',
      popupWindowStyle: {},
      isPC: true
    }
  },
  components: { RecoIcon },
  mounted () {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      this.isPC = false
    } else {
      this.isPC = true
    }
  },
  computed: {
    dataAddColor () {
      let { friendLink } = this.$themeConfig
      if (friendLink && friendLink.length > 0) {
        friendLink = friendLink.map(item => ({
          ...item,
          color: getOneColor()
        }))
        return friendLink
      }
      return []
    }
  },
  methods: {
    showDetail (e) {
      this.iconColor = getOneColor();
      const currentDom = e.target
      const popupWindowWrapper = currentDom.querySelector('.popup-window-wrapper')
      const popupWindow = currentDom.querySelector('.popup-window')
      const infoWrapper = document.querySelector('.info-wrapper')
      popupWindowWrapper.style.display = 'block'
      const { clientWidth } = currentDom
      const {
        clientWidth: windowWidth,
        clientHeight: windowHeight
      } = popupWindow
      if (this.isPC) {
        this.popupWindowStyle = {
          left: (clientWidth - windowWidth) / 2 + 'px',
          top: -windowHeight + 'px'
        }
        infoWrapper.style.overflow = 'visible'
        this.$nextTick(() => {
          this._adjustPosition(currentDom.querySelector('.popup-window'))
        })
      } else {
        const getPosition = function (element) {
          const dc = document
          const rec = element.getBoundingClientRect()
          let _x = rec.left
          let _y = rec.top
          _x += dc.documentElement.scrollLeft || dc.body.scrollLeft
          _y += dc.documentElement.scrollTop || dc.body.scrollTop
          return {
            left: _x,
            top: _y
          }
        }
        infoWrapper.style.overflow = 'hidden'
        const left = getPosition(currentDom).left - getPosition(infoWrapper).left
        this.popupWindowStyle = {
          left: (-left + (infoWrapper.clientWidth - popupWindow.clientWidth) / 2) + 'px',
          top: -windowHeight + 'px'
        }
      }
    },
    hideDetail (e) {
      const currentDom = e.target
      currentDom.querySelector('.popup-window-wrapper').style.display = 'none'
    },
    _adjustPosition (dom) {
      const { offsetWidth } = document.body
      const { x, width } = dom.getBoundingClientRect()
      const distanceToRight = offsetWidth - (x + width)
      if (distanceToRight < 0) {
        const { offsetLeft } = dom
        this.popupWindowStyle = {
          ...this.popupWindowStyle,
          left: offsetLeft + distanceToRight + 'px'
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.friend-link-wrapper
  position relative
  padding 0 0 30px
  .friend-link-item
    position relative
    vertical-align: middle;
    margin: 4px 4px 10px;
    padding: 4px 8px 4px 20px;
    line-height 20px
    display: inline-block;
    cursor: default;
    border-radius: $borderRadius
    font-size: 13px;
    box-shadow var(--box-shadow)
    transition: all .5s
    .list-style
      position absolute
      left .4rem
      top 0
      bottom 0
      margin auto
      display block
      width .4rem
      height .4rem
      border-radius .1rem
      background $accentColor
      content ''
    .popup-window-wrapper
      display none
      .popup-window
        position absolute
        background var(--background-color)
        box-shadow var(--box-shadow)
        border-radius $borderRadius
        box-sizing border-box
        padding .8rem 1rem
        width 300px
        .info
          .title-box
            display flex
            align-items center
            justify-content space-between
            height 2rem
            font-weight bold
            .title
              margin .2rem 0
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              span 
                margin-left 5px
            .btn-go
              width 2rem
              height 1.2rem
              border-radius $borderRadius
              font-size 12px
              color #ffffff
              text-align center
              line-height 1.2rem
              cursor pointer
              transition all .5s
  .more
    border-left 2px solid transparent
    border-radius $borderRadius
    background-color var(--background-color)
    padding: 8px 0.5rem 7px 0.5rem;
    font-size: 0.8rem;
    line-height: 0.95rem;
    &:hover
      background #f8f8f8
      border-color $accentColor
    a
      color $accentColor
      > i
        margin-right 0.4rem;

.fade-enter-active, .fade-leave-active
  transition opacity .5s
.fade-enter, .fade-leave-to
  opacity 0
</style>
