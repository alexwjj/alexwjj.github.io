<template>
  <div class="articleInfo-wrap">
    <div class="articleInfo">
      <ul
        class="breadcrumbs"
        v-if="articleInfo.classify1 && articleInfo.classify1 !== '_posts'"
      >
        <li>
          <router-link to="/" class="fa fa-laptop-house" title="首页"/>
        </li>
        <li>
          <router-link v-if="articleInfo.cataloguePermalink"
            :to="articleInfo.cataloguePermalink"
            :title="articleInfo.classify1+'-目录页'"
          >{{articleInfo.classify1}}</router-link>
          <router-link
            v-else-if="$themeConfig.category !== false"
            :to="`/categories/?category=${encodeURIComponent(articleInfo.classify1)}`"
            title="分类"
          >{{articleInfo.classify1}}</router-link>
          <span v-else>{{ articleInfo.classify1 }}</span>
        </li>
        <li v-if="articleInfo.classify2">
          <router-link
            v-if="articleInfo.cataloguePermalink"
            :to="articleInfo.cataloguePermalink + '#' + articleInfo.classify2"
            :title="articleInfo.classify1+'#'+articleInfo.classify2"
          >{{articleInfo.classify2}}</router-link>
          <router-link
            v-else-if="$themeConfig.category !== false"
            :to="`/categories/?category=${encodeURIComponent(articleInfo.classify2)}`"
            title="分类"
          >{{articleInfo.classify2}}</router-link>
          <span v-else>{{articleInfo.classify2}}</span>
        </li>
        <li v-if="articleInfo.classify3">
          <router-link
            v-if="articleInfo.cataloguePermalink"
            :to="articleInfo.cataloguePermalink + '#' + articleInfo.classify3"
            :title="articleInfo.classify1+'#'+articleInfo.classify3"
          >{{articleInfo.classify3}}</router-link>
          <router-link
            v-else-if="$themeConfig.category !== false"
            :to="`/categories/?category=${encodeURIComponent(articleInfo.classify3)}`"
            title="分类"
          >{{articleInfo.classify3}}</router-link>
          <span v-else>{{articleInfo.classify3}}</span>
        </li>
      </ul>
      <div class="info">
        <div v-if="articleInfo.author" class="author fa fa-user" title="作者">
          <a
            :href="articleInfo.author.href || articleInfo.author.link"
            v-if="articleInfo.author.href || articleInfo.author.link && typeof(articleInfo.author.link) === 'string'"
            target="_blank"
            class="beLink"
            title="作者"
          >{{articleInfo.author.name}}</a>
          <a
            v-else
            href="javascript:;"
          >{{articleInfo.author.name || articleInfo.author}}</a>
        </div>
        <div v-if="articleInfo.date" class="date fa fa-calendar-alt" title="创建时间">
          <a href="javascript:;">{{transformTime(articleInfo.date)}}</a>
        </div>
        <div class="fa fa-folder" title="分类"
          v-if="$themeConfig.category !== false && !(articleInfo.classify1 && articleInfo.classify1 !== '_posts') && articleInfo.categories"
        >
          <router-link
            :to="`/categories/?category=${encodeURIComponent(item)}`"
            v-for="(item, index) in articleInfo.categories"
            :key="index"
          >{{item + ' '}}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      articleInfo: {}
    }
  },
  created () {
    this.articleInfo = this.getPageInfo()
  },
  watch: {
    '$route.path' () {
      this.articleInfo = this.getPageInfo()
    }
  },
  methods: {
    transformTime: (timestamp) => {
      const dayjs = require('dayjs') // https://day.js.org/
      const utc = require('dayjs/plugin/utc');
      dayjs.extend(utc);
      return dayjs.utc(timestamp).format('YYYY/MM/DD HH:mm:ss');
    },
    getPageInfo () {
      const pageInfo = this.$page
      const { relativePath } = pageInfo
      const { sidebar } = this.$themeConfig

      // 分类采用解析文件夹地址名称的方式
      const relativePathArr = relativePath.split('/')

      const classifyArr = relativePathArr[0].split('.')
      const classify1 = classifyArr.length > 1 ? classifyArr[1] : classifyArr[0] // 文章一级分类名称
      const classify2 = relativePathArr.length > 2 ? relativePathArr[1].split('.')[1] : undefined// 文章二级分类名称
      const classify3 = relativePathArr.length > 3 ? relativePathArr[2].split('.')[1] : undefined// 文章三级分类名称

      const cataloguePermalink = sidebar && sidebar.catalogue ? sidebar.catalogue[classify1] : undefined// 目录页永久链接

      const author = this.$frontmatter.author || this.$themeConfig.author // 作者
      let date = (pageInfo.frontmatter.date || '').split(' ')[0] // 文章创建时间

      // 获取页面frontmatter的分类（碎片化文章使用）
      const { categories } = this.$frontmatter

      return {
        date,
        classify1,
        classify2,
        classify3,
        cataloguePermalink,
        author,
        categories
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
@require '../styles/wrapper.styl'

.articleInfo-wrap
  position relative
  z-index 1
  color var(--text-color-sub)
  margin-bottom 1rem
  .articleInfo
    overflow hidden
    font-size 0.92rem
    display flex
    justify-content space-between
    flex-wrap wrap
    .breadcrumbs
      margin 0
      padding 0
      overflow hidden
      line-height 1.5rem
      @media (max-width 960px)
        width 100%
      li
        list-style-type none
        float left
        padding-right 5px
        &:after
          content '/'
          margin-left 5px
          color #999
        &:last-child
          &:after
            content ''
        a
          color var(--text-color-sub)
          &:before
            font-size 0.92rem
          &:hover
            color $accentColor
        .icon-home
          text-decoration none
    .info
      line-height 1.5rem
      div
        margin-left 20px
        font-size 0.8rem
        @media (max-width 960px)
          margin 0 20px 0 0
        &:before
          margin-right 3px
        a
          color var(--text-color-sub)
          &:hover
            text-decoration none
        a.beLink
          &:hover
            color $accentColor
        &.date
          a
            cursor default
</style>
