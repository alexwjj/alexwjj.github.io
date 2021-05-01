<template>
  <div class="theme-vdoing-wrapper article-list"
    :class="[`${bgStyle}`, {'no-article-list': isShowArticle}]"
  >
    <div class="article-title">
      <router-link :to="moreArticle || '/archives/'" class="fa fa-pencil-alt">
        最近更新
      </router-link>
    </div>
    <div class="article-wrapper">
      <dl
        v-for="(item, index) in topPublishPosts"
        :key="index"
      >
        <dd>{{getNum(index)}}</dd>
        <dt>
          <div>
            <router-link :to="item.path">
              <div>{{item.title}}</div>
            </router-link>
          </div>
          <div class="date">
            <span>{{transformTime(item.frontmatter.date)}}</span>
          </div>
        </dt>
      </dl>

      <div class="more-box">
        <router-link :to="moreArticle || '/archives/'" class="more">
          <i class="fas fa-angle-double-right"></i>前往更多 ...
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'UpdateArticle',
  props: {
    length: {
      type: [String, Number],
      default: 3
    },
    moreArticle: String
  },
  data () {
    return {
      posts: [],
      currentPath: ''
    }
  },
  created () {
    this.posts = this.$site.pages
    this.currentPath = this.$page.path
  },
  computed: {
    bgStyle () {
      const contentBgStyle = this.$themeConfig.contentBgStyle || Math.ceil(Math.random()*14)
      return contentBgStyle ? 'bg-style-' + contentBgStyle : ''
    },
    topPublishPosts () {
      return this.$sortPostsByDate ? this.$sortPostsByDate.filter(post => {
        const { path } = post
        return path !== this.currentPath
      }).slice(0, this.length) : []

    },
    isShowArticle () {
      const { frontmatter } = this.$page
      return !(frontmatter.article !== false)
    }
  },
  methods: {
    getNum (index) {
      return index < 9 ? '0' + (index + 1) : index + 1
    },
    transformTime: (timestamp) => {
      const dayjs = require('dayjs') // https://day.js.org/
      const utc = require('dayjs/plugin/utc');
      dayjs.extend(utc);
      return dayjs.utc(timestamp).format('YYYY/MM/DD HH:mm:ss');
    },
  },
  watch: {
    $route () {
      this.currentPath = this.$page.path
    }
  }
}
</script>

<style lang='stylus'>
.article-list
  padding 1rem 2rem
  @media (max-width $MQNarrow)
    padding 1rem 1.5rem
  &.no-article-list
    display none
  .article-title
    font-size 1.3rem
    padding 1rem
    a
      font-size 1.2rem
      color var(--text-color)
      opacity 0.9
      &:before
        margin-right 0.4rem
        font-size 1.1rem
  .article-wrapper
    overflow hidden
    dl
      display flex
      padding 8px 0
      margin 0
      height 2rem
      width 100%
      dd
        font-size 1.1rem
        color #F17229
        width 50px
        text-align center
        margin 0
        line-height 2rem
      dt
        flex 1
        display flex
        justify-content space-between
        .date 
          flex 0 0 140px
        a
          color var(--text-color)
          flex 1
          display flex
          height 2rem
          align-items center
          font-weight normal
          div
            overflow hidden
            white-space normal
            text-overflow ellipsis
            display -webkit-box
            -webkit-line-clamp 2
            -webkit-box-orient vertical
            &:hover
              color $accentColor
        span
          width auto
          color var(--text-color-sub)
          text-align right
          font-size 0.9rem
          line-height 2rem
    .more-box
      padding 8px 0 8px 50px
      height 2rem
      width 100%
      .more
        color $accentColor
        cursor pointer
        > i
          margin-right 0.4rem;
</style>
