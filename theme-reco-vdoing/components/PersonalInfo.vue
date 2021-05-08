<template>
<div class="personal-info-wrapper">
  <img v-if="$themeConfig.authorAvatar"
    class="personal-img"
    :src="$withBase($themeConfig.authorAvatar)"
    alt="author-avatar"
  >
  <div class="author" v-if="$themeConfig.author || $site.title">
    {{ $themeConfig.author || $site.title }}
  </div>
  <div class="personal-info-details">
    <div>文章：<span>{{pageNums}}</span></div>
    <div>地点：<span>杭州·西湖</span></div>
  </div>
  <div class="slogan" v-if="$themeConfig.slogan">
    {{$themeConfig.slogan}}
  </div>
  <ul class="social-links" v-if="socialLinks && socialLinks.length">
    <li class="social-item" v-for="(item, index) in socialLinks" :key="index">
      <reco-icon :icon="item.icon" :link="item.link" :style="{ color: item.color }" />
    </li>
  </ul>
</div>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api'
import { RecoIcon } from '@vuepress-reco/core/lib/components'
import { getOneColor } from '@theme/helpers/other'

export default defineComponent({
  components: { RecoIcon },
  setup (props, ctx) {
    const { root: _this } = ctx
    const homeBlogCfg = computed(() => _this.$recoLocales.homeBlog)
    const socialLinks = computed(() => (_this.$themeConfig.blogConfig && _this.$themeConfig.blogConfig.socialLinks || []).map(item => {
      if (!item.color) item.color = getOneColor()
      return item
    }))
    const pageNums = computed(() => _this.$sortPosts.length)
    return { homeBlogCfg, socialLinks, pageNums }
  }
})
</script>

<style lang="stylus" scoped>
.personal-info-wrapper
  overflow hidden
  .personal-img
    display block
    margin 1.5rem auto 1rem
    width 6rem
    height 6rem
    border-radius 50%
  .author
    font-size 1rem
    text-align center
    color var(--text-color)
  .slogan
    margin-top 5px
    font-size .8rem
    text-align center
    color var(--text-color-sub)
  .personal-info-details 
    display flex
    justify-content center
    margin-top 5px
    font-size .8rem
    text-align center
    padding: 0 10px;
    color var(--text-color)
    > div
      &:first-child
        margin-right: 10px;
      span
        font-weight bold
  .social-links
    box-sizing border-box
    display flex
    justify-content center
    flex-wrap wrap
    padding 0 10px
    margin 10px 0 20px
    .social-item
      width 30px
      height 30px
      line-height 30px
      text-align center
      list-style none
      transition transform .3s
      &:hover
        transform scale(1.08)
      i
        cursor pointer
        font-size 20px
</style>
