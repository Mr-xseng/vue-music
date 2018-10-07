<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="handleQuery"></search-box>
    </div>
    <div class="shortcut-wrapper" v-show="!query" ref="shortcutWrapper">
      <scroll class="shortcut" :data="shortCut" ref="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li class="item" v-for="(item, index) in hotKey"
                  :key="index" @click="addQuery(item.k)"
              >
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">
                搜索历史
              </span>
              <span class="clear" @click="clear">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-list :searches="searchHistory"
                         @select="addQuery"
                         @delete="deleteSearchHistory"
            ></search-list>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" v-show="query" ref="searchResult">
      <suggest :query="query"
               ref="suggest"
               @listenScroll="listenScroll"
               @saveSearch="saveSearch"
      ></suggest>
    </div>
    <confirm ref="confirm" @confirm="clearSearchHistory"></confirm>
    <router-view></router-view>
  </div>
</template>

<script>
import SearchBox from 'base/search-box/searchBox'
import {gethotKey} from 'api/search'
import {ERR_OK} from 'api/config'
import Suggest from 'components/suggest/suggest'
import scroll from 'base/scroll/scroll'
import Confirm from 'base/confirm/confirm'
import {mapActions, mapGetters} from 'vuex'
import SearchList from 'base/search-list/searchList'
import {playListMixin} from 'common/js/mixin'
export default {
  name: 'search',
  mixins: [playListMixin],
  created () {
    this.getHotKey()
  },
  data () {
    return {
      hotKey: [],
      query: ''
    }
  },
  computed: {
    ...mapGetters([
      'searchHistory'
    ]),
    shortCut () {
      return this.hotKey.concat(this.searchHistory)
    }
  },
  components: {
    SearchBox,
    Suggest,
    SearchList,
    scroll,
    Confirm
  },
  methods: {
    getHotKey () {
      gethotKey().then((res) => {
        if (ERR_OK === res.code) {
          this.hotKey = res.data.hotkey.slice(0, 10)
          // console.log(this.hotKey)
        }
      })
    },
    clear () {
      this.$refs.confirm.show()
    },
    addQuery (key) {
      this.$refs.searchBox.acceptQuery(key)
    },
    handleQuery (value) {
      this.query = value
    },
    listenScroll () {
      this.$refs.searchBox.blur()
    },
    saveSearch () {
      this.saveSearchHistory(this.query)
      // console.log(this.searchHistory)
    },
    handlePlaylistMixin () {
      const bottom = this.playList.length > 0 ? '60px' : ' '
      this.$refs.searchResult.style.bottom = bottom
      this.$refs.suggest.refresh()
      // console.log(this.$refs.searchResult.style.top)
      this.$refs.shortcutWrapper.style.bottom = bottom
      this.$refs.shortcut.refresh()
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory',
      'clearSearchHistory'
    ])
  },
  watch: {
    query (newQ) {
      if (!newQ) {
        setTimeout(() => {
          this.$refs.shortcut.refresh()
        }, 20)
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>
