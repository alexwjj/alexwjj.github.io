<template>
  <div class="custom-page archives-page">
    <ModuleTransition delay="0.16">
      <div :class="`theme-vdoing-wrapper ${bgStyle}`">
          <div class="archives-page-title">
            <img v-if="$themeConfig.titleBadge === false ? false : true" :src="currentBadge"/>
            {{this.$page.title}}
          </div>
          <ul>
            <template v-for="(item, index) in postsList">
              <li
                class="year"
                v-if="(year = getYear(index)) !== getYear(index-1)"
                :key="index+$sortPostsByDate.length"
              >
                <div class="li-year">{{year}}</div>
              </li>
              <li :key="index">
                <router-link :to="item.path">
                  <span class="li-time">{{ getDate(item) }}</span>
                  {{item.title}}
                </router-link>
              </li>
            </template>
          </ul>
      </div>
    </ModuleTransition>
    <div v-if="fixedYear" class="fixed-year">
      <div class="year-count">
        <CountTo :startVal='1000' separator="" :endVal='fixedYear' :duration='500'></CountTo>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import { type } from '../helpers'
import TitleBadgeMixin from '../mixins/titleBadge'
import { ModuleTransition } from '@vuepress-reco/core/lib/components'

export default {
  mixins: [TitleBadgeMixin],
  data () {
    return {
      postsList: [],
      perPage: 50, // 每页长
      currentPage: 1, // 当前页
      fixedYear: 0, // 当前需要显示的年份
      fontSize: 12 // 字体大小 
    }
  },
  components: { ModuleTransition },
  computed: {
    bgStyle () {
      const contentBgStyle = this.$themeConfig.contentBgStyle || Math.ceil(Math.random()*7)
      return contentBgStyle ? 'bg-style-' + contentBgStyle : ''
    },
  },
  created () {
    this.getPageData()
  },
  mounted () {
    // 获取根元素的font-size
    this.fontSize = Number(getComputedStyle(window.document.documentElement)['font-size'].split('px')[0]);
    // 滚动监听
    window.addEventListener('scroll', debounce(() => {
      if (this.postsList.length < this.$sortPostsByDate.length) {
        const docEl = document.documentElement
        const docBody = document.body
        const scrollTop = docEl.scrollTop || docBody.scrollTop;
        const clientHeight = docEl.clientHeight || docBody.clientHeight;
        const scrollHeight = docEl.scrollHeight || docBody.scrollHeight;

        if (scrollHeight > clientHeight && scrollTop + clientHeight >= scrollHeight - 250) {
          this.loadmore()
        }
      }
      // 监听year元素的高度
      this.setFixedYear();
    }, 200))
  },
  methods: {
    setFixedYear() {
      let domList = document.getElementsByClassName('year');
      this.fixedYear = "";
      for(let i = 0; i < domList.length; i++) {
        if(domList[i].getBoundingClientRect().top < this.fontSize * 3.6) {
          this.fixedYear = Number(domList[i].innerText);
        }
      }
    },
    getPageData () {
      const currentPage = this.currentPage
      const perPage = this.perPage
      this.postsList = this.postsList.concat(this.$sortPostsByDate.slice((currentPage - 1) * perPage, currentPage * perPage))
    },
    loadmore () {
      this.currentPage = this.currentPage + 1
      this.getPageData()
    },
    getYear (index) {
      const item = this.postsList[index]
      if (!item) {
        return
      }
      const { frontmatter: { date } } = item
      if (date && type(date) === 'string') {
        return date.split(" ")[0].slice(0, 4)
      }
    },
    getDate (item) {
      const { frontmatter: { date } } = item
      if (date && type(date) === 'string') {
        return date.split(" ")[0].slice(5, 10)
      }
    }
  }
}
</script>

<style lang='stylus'>
@require '../styles/wrapper.styl'

.archives-page
  overflow hidden
  .fixed-year
    width 100%
    position fixed
    top $navbarHeight
    left 0
    .year-count
      margin 0 auto
      max-width 53.75rem
      line-height 2.2rem
      color #ff5722
      font-size 1.2rem
      font-weight bold
      background-color var(--background-color)
      padding 0.5rem 2.5rem
      border-bottom 1px solid #ff5722
      @media (max-width: $MQNarrow)
        padding 0.5rem 2rem
      @media (max-width: $MQMobileNarrow)
        padding 0.5rem 1.5rem
  .theme-vdoing-wrapper
    background-color transparent !important
    .archives-page-title
      font-size 1.4rem
      line-height 30px
      margin-bottom 1rem
      img 
        vertical-align text-bottom
    @extend $vdoing-wrapper
    position relative
    @media (min-width $contentWidth + 80)
      margin-top 1.5rem !important
    ul, li
      margin 0
      padding 0
    li
      list-style none
      .li-year
        margin-bottom 0.8rem
        font-size 1.2rem
        font-weight 400
        padding 0.5rem 0
        color #ff5722
        border-bottom 1px solid #ff5722
      a
        display block
        color var(--text-color)
        transition padding 0.3s
        padding 0.5rem 2rem
        line-height 1.2rem
        &:hover
          padding-left 2.5rem
          color $accentColor
          background #f9f9f9
          span 
            color $accentColor
        @media (max-width $contentWidth + 80)
          padding 0.5rem 1rem
          font-weight normal
          &:hover
            padding-left 1.5rem
        span
          font-size 1rem
          font-weight 400
          margin-right 0.3rem
          color var(--text-color)
    .loadmore
      text-align center
      margin-top 1rem
      opacity 0.5
</style>
