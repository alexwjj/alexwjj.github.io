<template>
  <div class="custom-page categories-page">
    <MainLayout>
      <template #mainLeft>
        <ModuleTransition delay="0.06">
          <CategoriesAllBar
            v-if="$categoriesAndTags.categories.length"
            :categoriesData="$categoriesAndTags.categories"
            :category="category"
          />
        </ModuleTransition>
        <ModuleTransition delay="0.16">
          <PostList
            :currentPage="currentPage"
            :perPage="perPage"
            :category="category"
          />
        </ModuleTransition>
        <ModuleTransition delay="0.2">
          <Pagination
            :total="total"
            :perPage="perPage"
            :currentPage="currentPage"
            @getCurrentPage="handlePagination"
            v-show="Math.ceil(total / perPage) > 1"
          />
        </ModuleTransition>
      </template>
      <template #mainRight>
        <ModuleTransition delay="0.26">
          <CategoriesAllBar
            v-if="$categoriesAndTags.categories.length"
            :categoriesData="$categoriesAndTags.categories"
            :category="category"
          />
        </ModuleTransition>
      </template>
    </MainLayout>
  </div>
</template>

<script>
import MainLayout from '@theme/components/MainLayout'
import PostList from '@theme/components/PostList'
import Pagination from '@theme/components/Pagination'
import CategoriesAllBar from '@theme/components/CategoriesAllBar'
import { ModuleTransition } from '@vuepress-reco/core/lib/components'

export default {
  data () {
    return {
      category: '',
      total: 0, // 总长
      perPage: 10, // 每页长
      currentPage: 1// 当前页
    }
  },
  components: { MainLayout, PostList, Pagination, CategoriesAllBar, ModuleTransition },
  mounted () {
    const queryCategory = this.$route.query.category
    if (queryCategory) {
      this.category = queryCategory
      this.total = this.$groupPosts.categories[queryCategory].length
    } else {
      this.total = this.$sortPosts.length
    }
    if (this.$route.query.p) {
      this.currentPage = Number(this.$route.query.p)
    }

    // 滚动条定位到当前分类（增强用户体验）
    const cateEl = document.querySelector('.categories-all')
    if (cateEl) {
      setTimeout(() => {
        const activeEl = cateEl.querySelector('.active')
        const topVal = activeEl ? activeEl.offsetTop : 0
        cateEl.scrollTo({ top: topVal, behavior: 'smooth' })
      }, 300)
    }
  },
  methods: {
    handlePagination (currentPage) { // 分页
      this.$router.push({
        query: {
          ...this.$route.query,
          p: currentPage
        }
      })
    }
  },
  watch: {
    '$route.query.category' (category) {
      this.category = category ? decodeURIComponent(category) : ''
      if (this.category) {
        this.total = this.$groupPosts.categories[this.category].length
      } else {
        this.total = this.$sortPosts.length
      }
      this.currentPage = 1

    },
    $route(from, to) {
      // 获取分页
      this.currentPage = this.$route.query.p ? Number(this.$route.query.p) : 1;
    }
  }
}
</script>

<style lang='stylus'>
.categories-page
  .main-left
    .categories-all-wrapper
      position relative
      top 0
      padding 0
      margin 0 0 0.9rem 0
      max-height 15rem
      border-radius 0
      display none
      @media (max-width $MQMobile)
        display block
      .categories-all
        max-height 12.3rem
        padding .5rem
  .main-right
    width calc(245px + 0.9rem) 
</style>
