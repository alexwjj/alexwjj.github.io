<template>
  <div>
    <main class="page">
      <div class="theme-vdoing-wrapper" :class="[`${bgStyle}`, {'is-page-component': pageComponent}]">
        <ModuleTransition>
          <ArticleInfo v-if="isArticle()" />
        </ModuleTransition>

        <ModuleTransition delay="0.08">
          <component v-if="pageComponent" class="theme-vdoing-content" :is="pageComponent"/>
        </ModuleTransition>

        <div class="content-wrapper">
          <ModuleTransition delay="0.16">
            <RightMenu v-if="showRightMenu" />
          </ModuleTransition>
          <ModuleTransition delay="0.12">
            <h1 v-if="showTitle">
              <img
                :src="currentBadge"
                v-if="$themeConfig.titleBadge === false ? false : true"
              />
              {{this.$page.title}}
            </h1>
          </ModuleTransition>
          <template v-if="showArticleFixed">
            <Content class="theme-vdoing-content article-fixed" />
          </template>
          <template v-else>
            <ModuleTransition delay="0.16">
              <Content class="theme-vdoing-content" />
            </ModuleTransition>
          </template>
        </div>
        <ModuleTransition delay="0.26">
          <PageEdit />
        </ModuleTransition>
        <PageNav v-bind="{ sidebarItems }" />
      </div>
      <ModuleTransition delay="0.32">
        <UpdateArticle v-if="isShowUpdateBar && !showArticleFixed" :length="$themeConfig.lastupdateNum"
          :moreArticle="updateBarConfig && updateBarConfig.moreArticle"
        />
      </ModuleTransition>
      <ModuleTransition delay="0.32">
        <Comments :isShowComments="shouldShowComments"/>
      </ModuleTransition>
    </main>
  </div>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue'
import PageNav from '@theme/components/PageNav.vue'
import ArticleInfo from './ArticleInfo.vue'
import Catalogue from './Catalogue.vue'
import UpdateArticle from './UpdateArticle.vue'
import RightMenu from './RightMenu.vue'
import TitleBadgeMixin from '../mixins/titleBadge'
import { ModuleTransition } from '@vuepress-reco/core/lib/components'

export default {
  mixins: [TitleBadgeMixin],
  data () {
    return {
      updateBarConfig: null
    }
  },
  props: ['sidebarItems'],
  components: { PageEdit, PageNav, ArticleInfo, Catalogue, UpdateArticle, RightMenu, ModuleTransition },
  created () {
    this.updateBarConfig = this.$themeConfig.updateBar
  },
  computed: {
    bgStyle () {
      const contentBgStyle = this.$themeConfig.contentBgStyle || Math.ceil(Math.random()*14)
      return contentBgStyle ? 'bg-style-' + contentBgStyle : ''
    },
    isShowUpdateBar () {
      return this.updateBarConfig && this.updateBarConfig.showToArticle === false ? false : true
    },
    // 是否显示评论
    shouldShowComments () {
      const { isShowComments } = this.$frontmatter
      const { showComment } = this.$themeConfig.valineConfig || { showComment: true }
      return (showComment !== false && isShowComments !== false) || (showComment === false && isShowComments === true)
    },
    showTitle () {
      return !this.$frontmatter.pageComponent
    },
    showArticleFixed() {
      return this.$frontmatter.articleFixed === true
    },
    showRightMenu () {
      const { $frontmatter, $themeConfig, $page } = this
      const { sidebar } = $frontmatter
      return (
        $themeConfig.rightMenuBar !== false &&
        $page.headers &&
        ($frontmatter && sidebar && sidebar !== false) !== false
      )
    },
    pageComponent () {
      return this.$frontmatter.pageComponent ? this.$frontmatter.pageComponent.name : false
    }
  },
  methods: {
    getShowStatus(prop) {
      const { htmlModules } = this.$themeConfig
      if(!htmlModules) return false
      if (htmlModules[prop] === 'article') { // 仅文章页显示
        return this.isArticle()
      } else if (htmlModules[prop] === 'custom'){ // 仅自定义页显示
        return !(this.isArticle())
      } else { // 全部显示
        return true
      }
    },
    isArticle () {
      return this.$frontmatter.article !== false
    }
  }
}
</script>

<style lang="stylus">
@require '../styles/wrapper.styl'

.page
  padding-bottom 2rem
  display block
  @media (max-width $MQMobile)
    padding-top $navbarHeight
  @media (min-width $MQMobile)
    padding-top ($navbarHeight + 1.5rem)
  >*
    @extend $vdoing-wrapper
  ::-webkit-scrollbar-thumb:vertical
    background-color #979797
  ::-webkit-scrollbar-thumb:horizontal
    background-color #979797
  .theme-vdoing-wrapper
    &.is-page-component
      background-color transparent
    .content-wrapper
      position relative
    h1 img
      margin-bottom -0.2rem
      max-width 2.2rem
      max-height 2.2rem
    .theme-vdoing-content
      padding 0 !important
      h1:first-child
        display none
  .comments-wrapper
    @extend $wrapper
    .valine-wrapper
      #valine.v
        .vwrap
          background-image url('/img/avatar-2.png')
          background-repeat no-repeat
          background-size 10rem
          background-position 90% 50%
    @media (max-width $MQMobile)
      .valine-wrapper
        #valine.v
          .vwrap
            background-size 5rem
/**
 * 右侧菜单的自适应
 */
@media (min-width 720px) and (max-width 1279px)
  .have-rightmenu
    .page
      padding-right 0.8rem !important
@media (max-width 1279px)
  .have-rightmenu
    .right-menu-wrapper
      display none
@media (min-width 1280px)
  .have-rightmenu
    .sidebar .sidebar-sub-headers
      display none
</style>
