<template>
  <div class="home-blog">
    <div @click="getFamousQuotes" :class="['hero', {'hide-banner': !showBanner}]">
      <div class="home-blog-hero">
        <ModuleTransition delay=".06">
          <img v-if="recoShowModule && $frontmatter.heroImage"
            class="hero-img" alt="俊劫的学习基地"
            :src="$withBase($frontmatter.heroImage)"
          />
        </ModuleTransition>

        <ModuleTransition delay=".16">
          <div v-if="recoShowModule && famousQuote" class="description">
            {{famousQuote.content}}<template v-if="famousQuote.title">——{{famousQuote.title}}</template>
          </div>
        </ModuleTransition>

        <ModuleTransition delay=".26">
          <div class="hero-link-box">
            <a class="hero-link" @click.stop="goToPostList">
              <i class="fas fa-chevron-down"></i>
            </a>
          </div>
        </ModuleTransition>
      </div>
      <canvas width="100%" height="100%" id="particleClockCanvas" class="home-blog-canvas"></canvas>
      <BubblesEffect :options="options"></BubblesEffect>
      <div ref="heroImageBackground" class="hero-img-background" :style="{'background-image': `url(${$withBase(heroBackgroundImage)})`}"></div>
      <div id="home-blog-wrapper-totop"></div>
    </div>

    <ModuleTransition delay="0.16">
      <div v-show="recoShowModule" class="home-blog-wrapper">
        <MainLayout>
          <template #mainLeft>
            <!-- 详情版文章列表 -->
            <template v-if="!homeData.postList">
              <PostList
                :currentPage="currentPage"
                :perPage="perPage"
              />
              <Pagination
                :total="total"
                :perPage="perPage"
                :currentPage="currentPage"
                @getCurrentPage="handlePagination"
                v-show="Math.ceil(total / perPage) > 1"
              />
            </template>
          </template>

          <template #mainRight>
            <div class="info-wrapper">
              <!-- 个人信息 -->
              <PersonalInfo/>
              <!-- 文章分类 -->
              <div class="info-item">
                <div class="item-title">
                  <span class="title">
                    <i class="fa fa-folder"></i>
                    {{$themeConfig.homeBlogCfg.category}}
                  </span>
                  <span class="num" :style="{'background-color': categoriesTagTextColor}">{{$categoriesAndTags.categories.length}}</span>
                </div>
                <hr>
                <CategoriesBar :categoriesData="$categoriesAndTags.categories" :length="$themeConfig.homeBlogCfg.categoryNum"/>
              </div>
              <!-- 热门标签 -->
              <div class="info-item">
                <div class="item-title">
                  <span class="title">
                    <reco-icon icon="reco-tag" />
                    {{$themeConfig.homeBlogCfg.tag}}
                  </span>
                  <span class="num" :style="{'background-color': categoriesTagTextColor}">{{$categoriesAndTags.tags.length}}</span>
                </div>
                <hr>
                <TagsBar :tagsData="$categoriesAndTags.tags" :length="$themeConfig.homeBlogCfg.tagNum"/>
              </div>
              <!-- 友情链接 -->
              <div class="info-item">
                <div class="item-title">
                  <span class="title">
                    <reco-icon icon="reco-friend" />
                    {{$themeConfig.homeBlogCfg.friendLink}}
                  </span>
                </div>
                <hr>
                <FriendLink :length="$themeConfig.homeBlogCfg.friendLinkNum"/>
              </div>
            </div>
            <div class="custom-html-box card-box" v-if="homeSidebarB" v-html="homeSidebarB"></div>
          </template>
        </MainLayout>
      </div>
    </ModuleTransition>

    <ModuleTransition delay="0.24">
      <Content v-show="recoShowModule" class="theme-vdoing-content card-box" custom/>
    </ModuleTransition>
  </div>
</template>

<script>
import FriendLink from '@theme/components/FriendLink'
import NoteAbstract from '@theme/components/NoteAbstract'
import MainLayout from '@theme/components/MainLayout'
import PostList from '@theme/components/PostList'
import CategoriesBar from '@theme/components/CategoriesBar'
import TagsBar from '@theme/components/TagsBar'
import Pagination from '@theme/components/Pagination'
import { ModuleTransition, RecoIcon } from '@vuepress-reco/core/lib/components'
import PersonalInfo from '@theme/components/PersonalInfo'
import { getOneColor } from '@theme/helpers/other'
import ParticleClock from '@theme/lib/particle-clock'

export default {
  components: { 
    NoteAbstract,
    FriendLink, 
    MainLayout, 
    PostList,
    CategoriesBar,
    TagsBar,
    Pagination,
    ModuleTransition, 
    PersonalInfo, 
    RecoIcon 
  },
  data () {
    return {
      categoriesTagTextColor: getOneColor(),
      currentPage: 1, // 当前页
      total: 0, // 总长
      perPage: 10, // 每页长
      famousQuote: '', // 名言警句
      heroBackgroundImage: '', // 设置背景图
      options: {
        color: 'rgba(225, 225, 225, 0.6)', //气泡颜色
        radius: 15, //气泡半径
        densety: 0.3, // 气泡密度 越大越密集(建议不要大于1)
        clearOffset: 0.2 // 气泡消失距离[0-1] 越大越晚消失
      }
    }
  },
  watch: {
    $route(from, to) {
      // 获取分页
      this.currentPage = this.$route.query.p ? Number(this.$route.query.p) : 1;
    }
  },
  computed: {
    homeSidebarB() {
      const { htmlModules } = this.$themeConfig
      return htmlModules ? htmlModules.homeSidebarB : ''
    },
    recoShowModule () {
      return this.$parent.recoShowModule
    },
    homeData () {
      return {
        ...this.$page.frontmatter
      }
    },
    actionLink () {
      const {
        actionLink: link,
        actionText: text
      } = this.$frontmatter

      return {
        link,
        text
      }
    },
    // 没有分页参数 p 隐藏banner栏
    showBanner () { 
      return this.$route.query.p
        && (!this.homeData.postList || this.homeData.postList === 'detailed')
        ? false : true
    },
  },
  created () {
    this.total = this.$sortPosts.length
    // 获取分页
    if (this.$route.query.p) {
      this.currentPage = Number(this.$route.query.p)
    }
  },
  mounted () {
    // 粒子时钟初始化
    ParticleClock().init('particleClockCanvas');
    // 初始化动态的名言警句
    this.getFamousQuotes()
    // 设置背景图
    this.setHeroBackgroundImage()
  },
  methods: {
    // 根据分类获取页面数据
    getPages () {
      let pages = this.$site.pages
      pages = pages.filter(item => {
        const { home, date } = item.frontmatter
        return !(home == true || date === undefined)
      })
      // reverse()是为了按时间最近排序排序
      this.pages = pages.length == 0 ? [] : pages
    },
    getPagesByTags (tagInfo) {
      this.$router.push({ path: tagInfo.path })
    },
    _setPage (page) {
      this.currentPage = page
      this.$page.currentPage = page
    },
    // 获取当前页码
    handlePagination (currentPage) {
      this.$router.push({
        query: {
          ...this.$route.query,
          p: currentPage
        }
      })
    },
    // 名言名句
    getFamousQuotes() {
      let len = this.$themeConfig.famousQuotes.length;
      let index = Math.ceil(Math.random()*len) - 1;
      this.famousQuote = this.$themeConfig.famousQuotes[index];
    },
    // 设置背景图
    setHeroBackgroundImage() {
      let len = this.$themeConfig.heroBackgroundImages.length;
      let index = Math.ceil(Math.random()*len) - 1;
      this.heroBackgroundImage = this.$themeConfig.heroBackgroundImages[index];
    },
    // 置顶
    goToPostList() {
      document.getElementById('home-blog-wrapper-totop').scrollIntoView({
        behavior: 'smooth', // 平滑滚动，其他还有 instant
        block: 'start' // 元素到页面顶部，其他还有 end, center
      })
    }
  }
}
</script>

<style lang="stylus">
.home-blog {
  padding: 0;
  margin: 0px auto;
  .hero {
    margin $navbarHeight auto 0
    position relative
    box-sizing border-box
    padding 0 20px
    height calc(100vh - 3.6rem)
    overflow hidden
    text-align center
    display flex
    align-items center
    justify-content center
    .hero-img {
      max-width: 10rem;
      margin: 0 auto 1rem
    }

    .description {
      font-size: 1.5rem
      color #242424
    }
  }

  .home-blog-wrapper {
    .info-wrapper {
      position -webkit-sticky
      position sticky
      overflow hidden
      transition all .3s
      margin-left 15px
      flex 0 0 300px
      height auto
      box-shadow var(--box-shadow)
      border-radius $borderRadius
      box-sizing border-box
      padding 0 15px
      transition box-shadow .4s
      &:hover {
        box-shadow var(--box-shadow-hover)
      }
    }
  }
}

@keyframes background-size-animation {
	0% {
    transform scale(1.2)
  }
  100% {
    transform scale(1)
  }
}

.hero
  // cursor url(/favicon.ico), auto !important
  canvas
    width 100% !important
    height calc(100vh - 3.6rem) !important
    z-index -1
  .home-blog-canvas
    z-index -2
    opacity 0.8
  .hero-img-background
    position absolute
    left 0
    top 0
    width 100% !important
    height calc(100vh - 3.6rem) !important
    z-index -3
    animation background-size-animation 6s ease-out 0s 1 
    background-repeat no-repeat
    background-position center center
    background-size cover
    
#home-blog-wrapper-totop
  position absolute
  bottom 3.4rem

@keyframes breathe-down-animation {
	0% {
    bottom -10rem
  }
  100% {
    bottom -10.4rem
  }
}

.home-blog-hero
  position relative
  height 12rem
  .hero-link-box
    width 100%
    position absolute
    bottom -10rem
    text-align center
    animation breathe-down-animation 1s linear 0s infinite alternate
    a
      display inline-block
      width 3rem
      height 3rem
      line-height 3rem
      border-radius 50%
      font-size 1.6rem
      text-align center
      cursor pointer
      box-shadow var(--box-shadow)
      color #fff
      &:hover
        box-shadow var(--box-shadow-hover)
      i 
        color #fff

// 分页不在第一页时，隐藏banner栏
.hero.hide-banner
  display none
  & + .home-blog-wrapper
    margin-top ($navbarHeight)

.home-blog-wrapper
  overflow hidden
  .info-item
    .item-title
      display flex
      justify-content space-between
      align-items center
      line-height 1.2rem
      span
        &.title
          font-weight 600
          i 
            color var(--text-color-sub)
            &.reco-tag
              font-size .95rem
            &.reco-friend
              font-size .9rem
        &.num 
          color #fff
          border-radius $borderRadius
          padding 0 0.2rem
          min-width 1rem
          height 1rem
          line-height 1rem
          text-align center

@media (max-width: $MQMobile) {
  .home-blog {
    .hero {
      .hero-img {
        max-width: 20rem;
        margin: 1rem auto;
      }

      .description {
        font-size: 1.2rem;
      }

      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }
    .home-blog-wrapper {
      display block!important
      .blog-list {
        width auto
      }
      .info-wrapper {
        // display none!important
        margin 0
        width 100%
        padding-top 1rem
        .personal-info-wrapper {
          display none
        }
      }
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .home-blog {
    .hero {
      img {
        max-height: 210px;
        margin: 1rem auto;
      }

      .description {
        font-size: 1.2rem;
      }

      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }

    .home-blog-wrapper {
      display block!important
      .blog-list {
        width auto
      }
      .info-wrapper {
        // display none!important
        margin 0
        width 100%
        .personal-info-wrapper {
          display none
        }
      }
    }
  }
}
</style>
