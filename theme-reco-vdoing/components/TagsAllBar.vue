<template>
  <div class="tags-all-wrapper">
    <div class="tags-all">
      <div class="tags-title">
        <RecoIcon icon="reco-tag"/>全部标签
      </div>
      <div class="tags-list"> 
        <router-link :to="`/tags/?tag=${encodeURIComponent('all')}`"
          :style="{'background-color': allTagsColor}"
          :class="[{active: tag === 'all'}, 'tag-item']"
        >所有</router-link>
        <template v-for="(item, index) in tags">
          <router-link :to="`/tags/?tag=${encodeURIComponent(item.key)}`"
            :key="index"
            :style="{'background-color': item.color}"
            :class="[{active: item.key === tag}, 'tag-item']"
          >{{item.key}}</router-link>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { getOneColor } from '@theme/helpers/other'
import { RecoIcon } from '@vuepress-reco/core/lib/components'

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
  components: { RecoIcon },
  data() {
    return {
      allTagsColor: getOneColor()
    }
  },
  computed: {
    tags () {
      let tagsData = this.tagsData.map(item => ({
        ...item,
        color: getOneColor()
      }))
      return tagsData
    }
  }
}
</script>

<style lang='stylus'>
.tags-all-wrapper
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
  .title
    color var(--text-color)
    opacity 0.9
    font-size 1.2rem
    &::before
      margin-right 0.3rem
  .tags-all
    padding: 0.5rem;
    transition all 0.2s
    .tags-title
      margin-bottom .6rem
      font-size 1rem
      i 
        margin-right .4rem
        font-size 1.1rem
        font-weight 600
    .tags-list
      display flex
      justify-content flex-start
      flex-wrap wrap
      padding-top .5rem
      max-height calc(100vh - 14rem)
      min-height 2.2rem
      overflow-y auto
      padding-right .5rem
      @media (max-width $MQMobile)
        max-height 10rem
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
</style>
