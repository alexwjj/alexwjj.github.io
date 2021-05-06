<template>
<ModuleTransition delay="0.46">
  <div class="footer-wrapper">
    <span class="footer-reco-theme">
      <reco-icon icon="reco-github" />
      <a target="blank" href="https://github.com/alexwjj/alexwjj.github.io">alexwjj.github.io@5.0</a>
    </span>
    <span v-if="$themeConfig.record">
      <reco-icon icon="reco-beian" />
      <a :href="$themeConfig.recordLink || '#'">{{ $themeConfig.record }}</a>
    </span>
    <span class="footer-copyright">
      <reco-icon icon="reco-copyright" />
      <a>
        <span v-if="$themeConfig.author || $site.title">{{ $themeConfig.author || $site.title }}</span>
        <span v-if="$themeConfig.startYear" class="ml5">
          {{ $themeConfig.startYear }} - {{ new Date().getFullYear() }}
        </span>
      </a>
    </span>
    <span class="footer-view-site">
      <reco-icon icon="reco-eye" />
      <span id="busuanzi_container_site_uv">
        访客数：<span id="busuanzi_value_site_uv" class="num">-</span>
      </span>
      <span id="busuanzi_container_site_pv" class="ml5">
        访问量：<span id="busuanzi_value_site_pv" class="num">-</span>
      </span>
    </span>
    <p class="cyber-security" v-if="$themeConfig.cyberSecurityRecord">
      <img src="https://img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png" alt="">
      <a :href="$themeConfig.cyberSecurityLink || '#'">{{ $themeConfig.cyberSecurityRecord }}</a>
    </p>
  </div>
</ModuleTransition>
</template>

<script>
import { ModuleTransition, RecoIcon } from '@vuepress-reco/core/lib/components'
import { addScriptToBody } from '@theme/helpers/utils'

export default({
  components: { ModuleTransition, RecoIcon },
  mounted() {
    let dom = document.getElementById('busuanziId')
    // 如果有需要重新删除在添加刷新
    if(!dom) {
      // 添加访问统计
      addScriptToBody('//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js', 'busuanziId');
    }
  }
})
</script>

<style lang="stylus" scoped>
.footer-wrapper
  padding 1.5rem 2.5rem
  border-top 1px solid var(--border-color)
  text-align center
  color $accentColor
  a 
    font-size 14px
    color $accentColor
    &.ml5
      margin-left .8rem
  > span
    margin-left 1rem
    &:first-child
      margin-left 0
    > i
      margin-right .5rem
  .cyber-security
    img
      margin-right .5rem
      width 20px
      height 20px
      vertical-align middle
    a
      vertical-align middle

.footer-view-site
  span
    font-size 14px
    color var(--text-color)
    &.ml5
      margin-left 5px
    &.num
      color $accentColor
      font-weight 600
.footer-copyright
  span
    color var(--text-color)
    &.ml5
      margin-left 5px

@media (max-width: $MQMobile)
  .footer-wrapper
    text-align left!important
    > span
      display block
      margin-left 0
      line-height 2rem
    .footer-reco-theme
      .vdoing
        display block
        padding-left 14px
</style>
