<template>
  <div class="custom-page tags-page">
    <MainLayout>
      <template #mainLeft>
        <ModuleTransition delay="0.06">
          <TagsAllBar
            v-if="$categoriesAndTags.tags.length"
            :tagsData="$categoriesAndTags.tags"
            :tag="tag"
          />
        </ModuleTransition>
        <ModuleTransition delay="0.16">
          <PostList
            :currentPage="currentPage"
            :perPage="perPage"
            :tag="tag"
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
          <TagsAllBar
            v-if="$categoriesAndTags.tags.length"
            :tagsData="$categoriesAndTags.tags"
            :tag="tag"
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
import TagsAllBar from '@theme/components/TagsAllBar'
import { ModuleTransition } from '@vuepress-reco/core/lib/components'

export default {
  data () {
    return {
      tag: '',
      total: 0, // 总长
      perPage: 10, // 每页长
      currentPage: 1// 当前页
    }
  },
  components: { MainLayout, PostList, Pagination, TagsAllBar, ModuleTransition },
  mounted () {
    const queryTag = this.$route.query.tag

    if (queryTag && queryTag !== 'all') {
      this.tag = queryTag
      this.total = this.$groupPosts.tags[queryTag].length
    } else {
      this.total = this.$sortPosts.length
    }
    if (this.$route.query.p) {
      this.currentPage = Number(this.$route.query.p)
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
    '$route.query.tag' (tag) {
      this.tag = tag ? decodeURIComponent(tag) : ''
      if (this.tag && tag !== 'all') {
        this.total = this.$groupPosts.tags[this.tag].length
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
.tags-page
  .main-left
    .tags-all-wrapper
      position relative
      top 0
      max-height 15rem
      padding: 0
      margin: 0 0 0.9rem 0
      border-radius 0
      display none
      @media (max-width $MQMobile)
        display block
      .tags
        max-height 11.5rem
  .main-right
    width calc(245px + 0.9rem) 
</style>
