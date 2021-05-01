<template>
  <div class="tags-wrapper">
    <div class="tags">
      <template v-for="(item, index) in tags">
        <router-link
          :to="`/tags/?tag=${encodeURIComponent(item.key)}`"
          :key="index"
          :style="{'background-color': item.color}"
          :class="[{active: item.key === tag}, 'tag-item']"
        >{{item.key}}</router-link>
      </template>
    </div>
    <div v-if="tagsData.length > length" class="more">
      <router-link to="/tags/">
        <i class="fas fa-angle-double-right"></i>前往更多 ...
      </router-link>
    </div>
  </div>
</template>

<script>
import { getOneColor } from '@theme/helpers/other'
export default {
  props: {
    tag: {
      type: String,
      default: ''
    },
    tagsData: {
      type: Array,
      default: []
    },
    length: {
      type: Number,
      default: 0
    }
  },
  computed: {
    tags () {
      let tagsData = this.tagsData.map(item => ({
        ...item,
        color: getOneColor()
      }))
      return tagsData.slice(0, this.length)
    }
  }
}
</script>

<style lang='stylus'>
.tags-wrapper
  padding 8px 0 1rem
  .title
    color var(--text-color)
    opacity 0.9
    font-size 1.2rem
    &::before
      margin-right 0.3rem
  .tags
    display flex
    justify-content flex-start
    flex-wrap wrap
    padding 0 .5rem
    a
      padding 0.2rem 0.4rem
      transition all 0.4s
      color #fff
      border-radius 3px
      margin 0 0.3rem 0.5rem 0
      height 1rem
      line-height 1rem
      font-size 0.8rem
      text-align center
      opacity 0.8
      @media (max-width $MQMobile)
        font-weight 400
      &.tag-item:hover
        opacity 1
        transform scale(1.05)
      &.tag-item.active
        box-shadow 0 5px 10px -5px var(--randomColor, rgba(0, 0, 0, 0.15))
        transform scale(1.1)
        opacity 1
        &:hover
          text-decoration none
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
</style>
