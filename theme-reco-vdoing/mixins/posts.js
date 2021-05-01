// import { filterPosts, sortPostsByStickyAndDate, sortPostsByDate } from '../helpers/postData'
import { 
  sortPostsByStickyAndDate, 
  sortPostsByDate,
  filterPostsReco, 
  filterPosts,
  sortPosts, 
  groupPosts, 
  categoriesAndTags 
} from '../helpers/postData'

export default {
  computed: {
    $recoPosts () {
      const {
        $categories: { list: articles }
      } = this

      let posts = articles.reduce((allData, currentData) => {
        return [...allData, ...currentData.pages]
      }, [])

      posts = filterPostsReco(posts, false)
      sortPostsByStickyAndDate(posts)

      return posts
    },
    $recoPostsForTimeline () {
      let pages = this.$recoPosts
      const formatPages = {}
      const formatPagesArr = []
      pages = filterPostsReco(pages, true)
      this.pages = pages.length == 0 ? [] : pages
      for (let i = 0, length = pages.length; i < length; i++) {
        const page = pages[i]
        const pageDateYear = dateFormat(page.frontmatter.date, 'year')
        if (formatPages[pageDateYear]) formatPages[pageDateYear].push(page)
        else {
          formatPages[pageDateYear] = [page]
        }
      }

      for (const key in formatPages) {
        const data = formatPages[key]
        sortPostsByDate(data)
        formatPagesArr.unshift({
          year: key,
          data
        })
      }

      return formatPagesArr
    },
    $showSubSideBar () {
      const {
        $themeConfig: { subSidebar: themeSubSidebar, sidebar: themeSidebar },
        $frontmatter: { subSidebar: pageSubSidebar, sidebar: pageSidebar }
      } = this

      const headers = this.$page.headers || []

      if ([pageSubSidebar, pageSidebar].indexOf(false) > -1) {
        return false
      } else if ([pageSubSidebar, pageSidebar].indexOf('auto') > -1 && headers.length > 0) {
        return true
      } else if ([themeSubSidebar, themeSidebar].indexOf('auto') > -1 && headers.length > 0) {
        return true
      } else {
        return false
      }
    },
    // vdoing 主题
    $filterPosts () { // 过滤非文章页和首页的文章数据
      return filterPosts(this.$site.pages)
    },
    $sortPosts () { // 按置顶和时间排序的文章数据
      return sortPosts(this.$filterPosts)
    },
    $sortPostsByDate () { // 仅按时间排序的文章数据
      return sortPostsByDate(this.$filterPosts)
    },
    $groupPosts () { // 按分类和标签分组的文章数据
      return groupPosts(this.$sortPosts)
    },
    $categoriesAndTags () { // 所有分类和标签数据
      return categoriesAndTags(this.$groupPosts)
    }
  }
}

function renderTime (date) {
  var dateee = new Date(date).toJSON()
  return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/-/g, '/')
}
function dateFormat (date, type) {
  date = renderTime(date)
  const dateObj = new Date(date)
  const year = dateObj.getFullYear()
  const mon = dateObj.getMonth() + 1
  const day = dateObj.getDate()
  if (type == 'year') return year
  else return `${mon}-${day}`
}
