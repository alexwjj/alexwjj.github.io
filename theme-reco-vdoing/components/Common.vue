<template>
  <div class="theme-container" :class="pageClasses">
    <transition name="fade">
      <LoadingPage v-show="firstLoad"/>
    </transition>

    <div :class="{ 'hide': firstLoad }">
      <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar" />

      <div class="sidebar-mask" @click="toggleSidebar(false)"></div>

      <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar">
        <PersonalInfo slot="top" />
        <slot name="sidebar-bottom" slot="bottom"/>
      </Sidebar>

      <slot></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, ref, onMounted } from '@vue/composition-api'
import Navbar from '@theme/components/Navbar'
import Sidebar from '@theme/components/Sidebar'
import PersonalInfo from '@theme/components/PersonalInfo'
import { setTimeout } from 'timers'
import logsFunc from '@theme/lib/logs'

export default defineComponent({
  components: { Sidebar, Navbar, PersonalInfo },

  props: {
    sidebar: {
      type: Boolean,
      default: true
    },
    sidebarItems: {
      type: Array,
      default: () => []
    },
    recoShowModule: {
      type: Boolean,
      default: false
    }
  },

  setup (props, ctx) {
    const { root } = ctx

    const isSidebarOpen = ref(false)
    const firstLoad = ref(true)

    const shouldShowSidebar = computed(() => props.sidebarItems.length > 0)

    const shouldShowNavbar = computed(() => {
      const { themeConfig } = root.$site
      const { frontmatter } = root.$page

      if (
        frontmatter.navbar === false ||
        themeConfig.navbar === false
      ) return false

      return (
        root.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        root.$themeLocaleConfig.nav
      )
    })
    const showRightMenu = computed(() => {
      const { headers } = root.$page
      return (
        !root.$frontmatter.home
        && root.$themeConfig.rightMenuBar !== false
        && headers
        && headers.length
        && root.$frontmatter.sidebar !== false
      )
    })
    const pageClasses = computed(() => {
      const userPageClass = root.$frontmatter.pageClass
      return {
        ...{
          'no-navbar': !shouldShowNavbar.value,
          'sidebar-open': isSidebarOpen.value,
          'no-sidebar': !shouldShowSidebar.value,
          'have-rightmenu': showRightMenu.value,
        },
        ...userPageClass
      }
    })

    const initRouterHandler = () => {
      root.$router.afterEach(() => {
        isSidebarOpen.value = false
      })
    }

    const toggleSidebar = (to) => {
      isSidebarOpen.value = typeof to === 'boolean' ? to : !isSidebarOpen.value
    }
    const handleLoading = () => {
      const time = root.$frontmatter.home && sessionStorage.getItem('firstLoad') == undefined ? 1000 : 0
      setTimeout(() => {
        firstLoad.value = false
        if (sessionStorage.getItem('firstLoad') == undefined) sessionStorage.setItem('firstLoad', false)
      }, time)
    }
    // 日志输出
    logsFunc(root.$site.themeConfig.version)

    onMounted(() => {
      initRouterHandler()
      handleLoading()
    })

    return { isSidebarOpen, shouldShowNavbar, shouldShowSidebar, pageClasses, toggleSidebar, firstLoad }
  }
})
</script>

<style lang="stylus" scoped>
.theme-container
  .hide
    height 100vh
    overflow hidden

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease-in-out .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
