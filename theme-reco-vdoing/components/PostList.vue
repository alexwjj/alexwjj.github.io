<template>
  <div class="post-list" ref="postList">
    <div
      class="post card-box"
      :class="item.frontmatter.sticky && 'sticky-top'"
      v-for="item in sortPosts"
      :key="item.key"
    >
      <div class="title-wrapper">
        <div class="article-title">
          <router-link :to="item.path">{{item.title || item.frontmatter.title}}</router-link>
        </div>
        <div class="article-info">
          <span class="author" title="作者" v-if="item.frontmatter.author">
            <i class="fa fa-user"></i>
            <a v-if="item.frontmatter.author.link" @click="goToUrl(item.frontmatter.author.link, true)"> 
              {{item.frontmatter.author.name ? item.frontmatter.author.name : $themeConfig.author }}
            </a>
            <template v-else>{{item.frontmatter.author.name}}</template>
          </span>
          <span class="author" title="作者" v-else-if="$themeConfig.author">
            <i class="fa fa-user"></i>{{$themeConfig.author}}
          </span>
          <span class="time" title="创建时间" v-if="item.lastUpdated || item.frontmatter.date">
            <i class="fa fa-calendar-alt"></i>
            {{item.frontmatter.date ? transformTime(item.frontmatter.date) : item.lastUpdated}}
          </span>
          <span class="categories" title="分类" v-if="$themeConfig.category !== false && item.frontmatter.categories">
            <i class="fa fa-folder"></i>
            <router-link
              :to="`/categories/?category=${encodeURIComponent(c)}`"
              v-for="(c, index) in item.frontmatter.categories"
              :key="index"
            >{{c}}</router-link>
          </span>
          <span class="tags" title="标签"
            v-if="$themeConfig.tag !== false && item.frontmatter.tags && item.frontmatter.tags[0]"
          >
            <i class="iconfont reco-tag"></i>
            <router-link :to="`/tags/?tag=${encodeURIComponent(t)}`"
              v-for="(t, index) in item.frontmatter.tags"
              :key="index"
            >{{t}}</router-link>
          </span>
        </div>
      </div>
      <div class="excerpt-wrapper" v-if="item.excerpt">
        <div class="excerpt" v-html="item.excerpt"></div>
        <div class="readmore-box">
          <span class="readmore">
            <i class="fas fa-angle-double-right"></i>
            <router-link :to="item.path">阅读全文</router-link>
            <i class="fas fa-angle-double-left"></i>
          </span>
        </div>
      </div>
      <div class="animation-bg">
        <i style="animation-delay: 1.15832s;"></i>
        <i style="animation-delay: 0.244465s;"></i>
        <i style="animation-delay: 0.772443s;"></i>
        <i style="animation-delay: 1.19775s;"></i>
        <i style="animation-delay: 0.794491s;"></i>
        <i style="animation-delay: 0.721968s;"></i>
        <i style="animation-delay: 1.19775s;"></i>
        <i style="animation-delay: 0.794491s;"></i>
        <i style="animation-delay: 0.721968s;"></i>
        <i style="animation-delay: 1.15832s;"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: ''
    },
    currentPage: {
      type: Number,
      default: 1
    },
    perPage: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      sortPosts: []
    }
  },
  created () {
    this.setPosts()
  },
  watch: {
    currentPage () {
      this.setPosts()
    },
    category () {
      this.setPosts()
    },
    tag () {
      this.setPosts()
    }
  },
  methods: {
    transformTime: (timestamp) => {
      const dayjs = require('dayjs') // https://day.js.org/
      const utc = require('dayjs/plugin/utc');
      dayjs.extend(utc);
      return dayjs.utc(timestamp).format('YYYY/MM/DD HH:mm:ss');
    },
    setPosts () {
      const currentPage = this.currentPage
      const perPage = this.perPage

      let posts = []
      if (this.category) {
        posts = this.$groupPosts.categories[this.category]
      } else if (this.tag && this.tag !== 'all') {
        posts = this.$groupPosts.tags[this.tag]
      } else {
        posts = this.$sortPosts
      }

      this.sortPosts = posts.slice((currentPage - 1) * perPage, currentPage * perPage)
    }
  }
}
</script>

<style lang='stylus'>
@keyframes meteor-shower-animation {
  0% {
    transform: rotate(30deg) translateY(0)
  }

  to {
    transform: rotate(30deg) translateY(150px)
  }
}
@keyframes breathe-animation {
	0% {
    transform scale(1)
  }
  100% {
    transform scale(1.05)
  }
}

.post-list
  margin-bottom 4rem
  .post
    position relative
    padding 1rem 1.5rem
    margin-bottom 0.9rem
    transition all 0.4s linear;
    border-radius: 0.25rem;
    box-shadow var(--box-shadow)
    overflow hidden
    &.sticky-top::before
      content "TOP"
      width 60px
      height 16px
      line-height 16px
      position: absolute;
      top: -1px;
      right: 0;
      font-size: .8rem;
      color #fff
      letter-spacing 2px
      text-align center
      background-color: #ff5722;
      opacity: .85;
      transform translateX(16px) translateY(9px) rotate(45deg)
    &:hover
      box-shadow var(--box-shadow-hover)
    .title-wrapper
      a
        color var(--text-color)
        cursor pointer
        &:hover
          color $accentColor !important
      .article-title
        font-size 1.1rem
        border none
        > a
          @media (max-width $MQMobile)
            font-weight 400
      .article-info
        margin-top 0.5rem
        > span
          font-size 0.8rem
          margin-right 1rem
          color var(--text-color-sub) !important
          > i
            margin-right 0.4rem;
          a
            font-size 0.8rem
            color var(--text-color-sub) !important
            &:hover
              color $accentColor !important
          &::before
            margin-right 0.3rem
        .categories
          a
            margin 0
            &:not(:nth-child(2))
              &::before
                content '/'
                margin 0 2px
        .tags a:not(:nth-child(2))::before
          content '、'
    .excerpt-wrapper
      border-top 1px solid var(--border-color)
      margin 0.5rem 0
      overflow hidden
      .excerpt
        margin-bottom 0.3rem
        font-size 0.92rem
        h1, h2, h3
          display none
        img
          max-height 280px
          max-width 100% !important
          margin 0 auto
      .readmore-box
        text-align right 
        .readmore
          font-size .9rem
          line-height 1rem
          color $accentColor
          transition transfrom .2s linear
          &:hover
            i
              // animation: name duration timing-function delay iteration-count direction fill-mode play-state;
              animation: breathe-animation .4s linear 0s infinite alternate;
          &::before
            font-size: 1rem;
            margin-left 0.3rem
    &:hover
      .animation-bg
        i
          // animation: name duration timing-function delay iteration-count direction fill-mode play-state;
          animation: meteor-shower-animation 1s linear 0s infinite;
    .animation-bg
      i
        position: absolute;
        top: -40px;
        width: 1.5px;
        height: 40px;
        margin-right 10px
        background: linear-gradient(180deg, transparent, #3eaf7c);
        transform: rotate(30deg);
        &:nth-child(1)
          left: 10%;
        &:nth-child(2)
          left: 20%;
        &:nth-child(3)
          left: 30%;
        &:nth-child(4)
          left: 40%;
        &:nth-child(5)
          left: 50%;
        &:nth-child(6)
          left: 60%;
        &:nth-child(7)
          left: 70%;
        &:nth-child(8)
          left: 80%;
        &:nth-child(9)
          left: 90%;
        &:nth-child(10)
          left: 100%;
</style>
