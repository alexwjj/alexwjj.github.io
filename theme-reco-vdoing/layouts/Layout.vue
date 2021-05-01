<template>
  <Common :sidebarItems="sidebarItems" :recoShowModule="recoShowModule">
    <!-- 首页 -->
    <HomeBlog v-if="$frontmatter.home"/>

    <!-- 分类页 -->
    <CategoriesPage v-else-if="$page.frontmatter.categoriesPage" />

    <!-- 标签页 -->
    <TagsPage v-else-if="$page.frontmatter.tagsPage" />

    <!-- 归档页 -->
    <ArchivesPage v-else-if="$page.frontmatter.archivesPage" />

    <!-- 文章页或其他页 -->
    <Page v-else :sidebar-items="sidebarItems"></Page>

    <!-- 脚部 -->
    <Footer />

    <!-- 消息通知 -->
    <KxmWeather v-if="$frontmatter.home"/>
  </Common>
</template>

<script>
import HomeBlog from '@theme/components/HomeBlog'
import Page from '@theme/components/Page'
import Footer from '@theme/components/Footer'
import Common from '@theme/components/Common'
import KxmWeather from '@theme/components/KxmWeather'
import ArchivesPage from '@theme/components/ArchivesPage.vue'
import CategoriesPage from '@theme/components/CategoriesPage.vue'
import TagsPage from '@theme/components/TagsPage.vue'
import { resolveSidebarItems } from '@theme/helpers/utils'
import moduleTransitonMixin from '@theme/mixins/moduleTransiton'

export default {
  mixins: [moduleTransitonMixin],
  components: { HomeBlog, Page, Common, KxmWeather, Footer, ArchivesPage, CategoriesPage, TagsPage },
  computed: {
    sidebarItems () {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      )
    },
    mounted() {
      // 初始化页面时链接锚点无法跳转到指定id的解决方案
      const hash = document.location.hash;
      if (hash.length > 1) {
        const id = decodeURIComponent(hash.substring(1))
        const element = document.getElementById(id)
        if (element) element.scrollIntoView()
      }
    },
  }
};
</script>

<style src="../styles/theme.styl" lang="stylus"></style>
