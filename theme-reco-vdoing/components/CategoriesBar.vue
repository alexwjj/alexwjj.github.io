<template>
  <div class="categories-wrapper">
    <div class="categories">
      <router-link
        :to="`/categories/?category=${encodeURIComponent(item.key)}`"
        v-for="(item, index) in categories"
        :key="index"
        :class="{active: item.key === category}"
      >
        <span class="key">{{item.key}}</span>
        <span class="length" :style="{ 'color': item.color }">{{item.length}}</span>
      </router-link>
    </div>
    <div class="more" v-if="length < categoriesData.length">
      <router-link to="/categories/">
        <i class="fas fa-angle-double-right"></i>前往更多 ...
      </router-link>
    </div>
  </div>
</template>

<script>
import { getOneColor } from '@theme/helpers/other'
export default {
  props: {
    category: {
      type: String,
      default: ''
    },
    categoriesData: {
      type: Array,
      default: []
    },
    length: {
      type:Number,
      default: 0
    }
  },
  computed: {
    categories () {
      let categoriesData = this.categoriesData.map(item => ({
        ...item,
        color: getOneColor()
      }))
      return categoriesData.slice(0, this.length)
    }
  }
}
</script>

<style lang='stylus'>
.categories-wrapper
  overflow hidden
  padding-bottom 1rem
  .categories
    a
      display flex
      justify-content space-between
      padding 8px .5rem 7px .5rem
      color var(--text-color)
      font-size 0.8rem
      line-height 0.95rem
      position relative
      transition all .2s
      border-left 2px solid transparent
      border-radius $borderRadius
      
      @media (max-width $MQMobile)
        font-weight 400
      &:not(.active):hover
        color $accentColor
        background #f8f8f8
        border-color $accentColor
        span
          opacity 0.8
      .key 
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
      .length
        color #fff
        border-radius $borderRadius
        padding 0 0.13rem
        min-width 1rem
        height 1rem
        line-height 1rem
        font-size 0.6rem
        font-weight bold
        text-align center
      &.active
        background $accentColor
        // color var(--mainBg)
        padding-left 0.8rem
        border-radius 1px
        border-color transparent
  .more
    border-left 2px solid transparent
    border-radius $borderRadius
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
