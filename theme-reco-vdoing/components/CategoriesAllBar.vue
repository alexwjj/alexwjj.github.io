<template>
  <div class="categories-all-wrapper">
    <div class="categories-all">
      <div class="categories-title">
        <i class="fa fa-folder"></i>全部分类
      </div>
      <div class="categories-list"> 
        <router-link :to="`/categories/?category=${encodeURIComponent(item.key)}`"
          v-for="(item, index) in categories"
          :key="index"
          :class="{active: item.key === category}"
        >
          <span class="key">{{item.key}}</span>
          <span class="length" :style="{ 'color': item.color }">{{item.length}}</span>
        </router-link>
      </div>
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
      return categoriesData
    }
  }
}
</script>

<style lang='stylus'>
.categories-all-wrapper
  margin 0 0 1.5rem .9rem
  transition all 0.4s linear
  border-radius $borderRadius
  box-shadow var(--box-shadow)
  position fixed
  top ($navbarHeight + 1.5rem)
  max-height calc(100vh - 10rem)
  min-height 4.2rem
  @media (max-width $MQMobile)
    display none
    &:hover
      box-shadow var(--box-shadow-hover)
  .categories-all
    position relative
    padding 0.5rem 0 .5rem .5rem
    transition all 0.2s
    .categories-title
      margin-bottom .6rem
      font-size 1rem
      i 
        margin-right .4rem
    .categories-list
      max-height calc(100vh - 14rem)
      min-height 2.2rem
      overflow-y auto
      padding-right .5rem
      @media (max-width $MQMobile)
        max-height 7rem
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
          max-height 12.3rem
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
          color #fff
          border-color transparent
          span 
            color #fff !important
</style>
