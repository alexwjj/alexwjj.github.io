<template>
  <div class="search-box">
    <reco-icon icon="reco-search" />
    <input
      @input="query = $event.target.value"
      aria-label="Search"
      :value="query"
      :class="{ 'focused': focused }"
      :placeholder="placeholder"
      autocomplete="off"
      spellcheck="false"
      @focus="focused = true"
      @blur="focused = false"
      @keyup.enter="go(focusIndex)"
      @keyup.up="onUp"
      @keyup.down="onDown"
      ref="input"
    >
    <ul
      class="suggestions"
      v-show="showSuggestions"
      :class="{ 'align-right': alignRight }"
      @mouseleave="unfocus"
    >
      <li
        class="suggestion"
        v-for="(s, i) in suggestions"
        :key="i"
        :class="{ focused: i === focusIndex }"
        @mousedown="go(i)"
        @mouseenter="focus(i)"
      >
        <a :href="s.path" @click.prevent v-if="!s.thirdparty">
          <span class="page-title">{{ s.title || s.path }}</span>
          <span v-if="s.header" class="header">&gt; {{ s.header.title }}</span>
        </a>
        <!-- 第三方搜索 -->
        <a class="thirdparty" href="javascript:;" @click.prevent v-else>
          <span class="page-title" :title="s.title">{{ s.title }}</span>
          <svg class="icon outbound" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" x="0px" y="0px" viewBox="0 0 100 100" width="15" height="15">
            <path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path>
            <polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon>
          </svg>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { RecoIcon } from '@vuepress-reco/core/lib/components'

export default {
  components: { RecoIcon },
  data () {
    return {
      query: '',
      focused: false,
      focusIndex: 0,
      placeholder: undefined
    }
  },
  mounted () {
    this.placeholder = this.$site.themeConfig.searchPlaceholder || ''
  },
  computed: {
    showSuggestions () {
      return (
        this.focused && this.suggestions && this.suggestions.length
      )
    },
    suggestions () {
      const query = this.query.trim().toLowerCase()
      if (!query) {
        return
      }
      const { pages } = this.$site
      const max = this.$site.themeConfig.searchMaxSuggestions
      const localePath = this.$localePath
      const matches = item => (
        item && item.title && item.title.toLowerCase().indexOf(query) > -1
      )
      const res = []
      for (let i = 0; i < pages.length; i++) {
        if (res.length >= max) break
        const p = pages[i]
        // filter out results that do not match current locale
        if (this.getPageLocalePath(p) !== localePath) {
          continue
        }
        if (matches(p)) {
          res.push(p)
        } else if (p.headers) {
          for (let j = 0; j < p.headers.length; j++) {
            if (res.length >= max) break
            const h = p.headers[j]
            if (matches(h)) {
              res.push(Object.assign({}, p, {
                path: p.path + '#' + h.slug,
                header: h
              }))
            }
          }
        }
      }

      // 添加第三方链接数据
      let SEARCH_THIRDPARTY = JSON.parse(JSON.stringify(this.$site.themeConfig.searchThirdparty));
      if (SEARCH_THIRDPARTY.length) {
        SEARCH_THIRDPARTY.forEach(item => {
          item.thirdparty = true
          item.title = `${item.title}"${this.query}"`
          item.behindUrl = item.behindUrl || ''
          res.push(item)
        })
      }
      return res
    },
    // make suggestions align right when there are not enough items
    alignRight () {
      const navCount = (this.$site.themeConfig.nav || []).length
      const repo = this.$site.repo ? 1 : 0
      return navCount + repo <= 2
    }
  },
  methods: {
    getPageLocalePath (page) {
      for (const localePath in this.$site.locales || {}) {
        if (localePath !== '/' && page.path.indexOf(localePath) === 0) {
          return localePath
        }
      }
      return '/'
    },
    onUp () {
      if (this.showSuggestions) {
        if (this.focusIndex > 0) {
          this.focusIndex--
        } else {
          this.focusIndex = this.suggestions.length - 1
        }
      }
    },
    onDown () {
      if (this.showSuggestions) {
        if (this.focusIndex < this.suggestions.length - 1) {
          this.focusIndex++
        } else {
          this.focusIndex = 0
        }
      }
    },
    go (i) {
      if (!this.showSuggestions) {
        return
      }
      const item = this.suggestions[i]
      // 支持第三方跳转
      if (item.thirdparty) {
        window.open(
          item.frontUrl + this.query + item.behindUrl, 
          '_blank'
        )
      } else {
        this.$router.push(item.path)
        this.query = ''
        this.focusIndex = 0
      }
    },
    focus (i) {
      this.focusIndex = i
    },
    unfocus () {
      this.focusIndex = -1
    }
  }
}
</script>

<style lang="stylus">
.search-box
  display inline-block
  position relative
  margin-right 1rem
  .iconfont
    position absolute
    top 0
    bottom 0
    z-index 0
    left .6rem
    margin auto
  input
    cursor text
    width 10rem
    height: 2rem
    color lighten($textColor, 25%)
    display inline-block
    border 1px solid var(--border-color)
    border-radius $borderRadius
    font-size 0.9rem
    line-height 2rem
    padding 0 0.5rem 0 2rem
    outline none
    transition all .2s ease
    background transparent
    background-size 1rem
    &:focus
      cursor auto
      border-color $accentColor
  .suggestions
    background var(--background-color)
    width 20rem
    max-height: 30rem;
    overflow: auto;
    position absolute
    top 1.5rem
    border 1px solid darken($borderColor, 10%)
    border-radius 0.25rem;
    padding 0.4rem
    list-style-type none
    &.align-right
      right 0
  .suggestion
    line-height 1.4
    padding 0.4rem 0.6rem
    border-radius 4px
    cursor pointer
    a
      white-space normal
      color var(--text-color)
      .page-title
        width 100%
        font-weight 600
        overflow hidden
        text-overflow: ellipsis;
      .header
        font-size 0.9em
        margin-left 0.25em
      &.thirdparty
        display flex
        justify-content space-between
        align-items flex-end
    &.focused
      background-color var(--border-color)
      a
        color $accentColor
@media (max-width: $MQNarrow)
  .search-box
    input
      cursor pointer
      width 0
      border-color transparent
      position relative
      &:focus
        cursor text
        left 0
        width 10rem
// Match IE11
@media all and (-ms-high-contrast: none)
  .search-box input
    height 2rem
@media (max-width: $MQNarrow) and (min-width: $MQMobile)
  .search-box
    margin-right 0
    .suggestions
      left 0
@media (max-width: $MQMobile)
  .search-box
    margin-right -1rem
    .suggestions
      right 0
@media (max-width: $MQMobileNarrow)
  .search-box
    .suggestions
      width calc(100vw - 4rem)
    input:focus
      width 8rem
</style>
