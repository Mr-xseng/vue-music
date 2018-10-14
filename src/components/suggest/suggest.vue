<template>
  <scroll ref="suggest"
          class="suggest"
          :data="searchResult"
          :pullup="pullup"
          @scrollToEnd="searchMore"
          :beforeScroll="beforeScroll"
          @beforeScroll="listenScroll"
  >
    <ul class="suggest-list">
      <li  class="suggest-item"
           v-for="(item, index) in searchResult"
           :key="index"
           @click="selectItem(item)"
      >
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=" "></loading>
    </ul>
    <div class="no-result-wrapper" v-show="!hasMore && !searchResult.length">
      <no-result title="抱歉,暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>
<script>
import {search} from 'api/search'
import {ERR_OK} from 'api/config'
import {creatSong} from 'common/js/song'
import scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import Singer from 'common/js/Singer'
import {mapMutations, mapActions} from 'vuex'
import NoResult from 'base/no-result/NoResult'
const perpage = 20
const TYPE_SINGER = 'singer'

export default{
  name: 'Suggest',
  data () {
    return {
      page: 1,
      searchResult: [],
      pullup: true,
      hasMore: true,
      beforeScroll: true
    }
  },
  components: {
    scroll,
    Loading,
    NoResult
  },
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    selectItem (item) {
      if (item.type === TYPE_SINGER) {
        const singer = new Singer({
          id: item.singermid,
          name: item.singername
        })
        this.$router.push({
          path: `/search/${singer.id}`
        })
        this.setSinger(singer)
      } else {
        this.insertSong(item)
      }
      this.$emit('select')
    },
    refresh () {
      this.$refs.suggest.refresh()
      // console.log('刷新')
    },
    listenScroll () {
      this.$emit('listenScroll')
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'insertSong'
    ]),
    search () {
      // console.log(this.query)
      this.page = 1
      this.hasMore = true
      this.$refs.suggest.scrollTo(0, 0)
      search(this.query, this.page, this.showSinger, perpage).then((res) => {
        if (ERR_OK === res.code) {
          this.searchResult = this.getSearchResult(res.data)
          this.checkMore(res.data)
        }
      })
      // this.refresh()
    },
    searchMore () {
      if (!this.hasMore) {
        return
      }
      this.page++
      search(this.query, this.page, this.showSinger, perpage).then((res) => {
        if (ERR_OK === res.code) {
          this.searchResult = this.searchResult.concat(this.getSearchResult(res.data))
          this.checkMore(res.data)
          // this.refresh()
        }
      })
    },
    checkMore (data) {
      const song = data.song
      const totalnum = song.totalnum
      if (!song.list.length || song.curnum + (song.curpage - 1) * perpage >= totalnum) {
        this.hasMore = false
      }
    },
    getIconCls (item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },
    getDisplayName (item) {
      if (item.type === TYPE_SINGER) {
        return `${item.singername}`
      } else {
        return `${item.name} - ${item.singer}`
      }
    },
    getSearchResult (data) {
      let ret = []
      if (data.zhida && data.zhida.singerid && this.page === 1) {
        ret.push({...data.zhida, ...{type: TYPE_SINGER}})
      }
      ret = ret.concat(this.normalMusic(data.song.list))
      return ret
    },
    normalMusic (list) {
      let ret = []
      list.forEach((musicData) => {
        if (musicData.songmid && musicData.albummid) {
          ret.push(creatSong(musicData))
        }
      })
      return ret
    }
  },
  watch: {
    query (newQ) {
      this.search(newQ)
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .suggest
    height 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
