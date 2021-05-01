<template>
  <div class="page-edit">
    <div
      class="tags"
      v-if="$themeConfig.tag !== false && tags && tags[0]"
    >
      <router-link
        :to="`/tags/?tag=${encodeURIComponent(item)}`"
        v-for="(item, index) in tags"
        :key="index"
        title="标签"
      >#{{item}}</router-link>
    </div>

    <div
      class="last-updated"
      v-if="lastUpdated"
    >
      <span class="prefix">{{ lastUpdatedText }}：</span>
      <span class="time">{{ lastUpdated }}</span>
    </div>
  </div>
</template>
<script>

export default {
  name: 'PageEdit',
  computed: {
    tags () {
      return this.$frontmatter.tags
    },

    lastUpdated () {
      return this.$page.lastUpdated
    },

    lastUpdatedText () {
      if (typeof this.$themeLocaleConfig.lastUpdated === 'string') {
        return this.$themeLocaleConfig.lastUpdated
      }
      if (typeof this.$site.themeConfig.lastUpdated === 'string') {
        return this.$site.themeConfig.lastUpdated
      }
      return 'Last Updated'
    }
  }
}
</script>
<style lang="stylus">
@require '../styles/wrapper.styl'

.page-edit
  @extend $wrapper
  padding 1rem 0 0
  overflow auto
  .tags
    float left
    a
      margin 0 0.8rem 0.5rem 0
      display inline-block
      color $accentColor
      padding 0.2rem 0.7rem
      font-size 0.9em
      background-color rgba(128, 128, 128, 0.08)
      border-radius 3px
      opacity 0.8
  .last-updated
    float right
    font-size 0.9em
    .prefix
      font-weight 500
      color var(--text-color)
      opacity 0.8
    .time
      font-weight 400
      color #aaa
@media (max-width $MQMobile)
  .page-edit
    .tags
      margin-bottom 0.5rem
    .last-updated
      width 100%
      font-size 0.8em
      text-align left
</style>
