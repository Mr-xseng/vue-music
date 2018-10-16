<template>
  <transition name="slide">
    <div class="user-center" @click.stop>
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <div class="switches-wrapper">
        <switches :switches="switches"
                  :currentIndex="currentIndex"
                  @switchesItem="selectItem"></switches>
      </div>
      <div class="play-btn" @click="random">
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>
      <div class="list-wrapper" ref="listWrapper">
        <scroll class="list-scroll" ref="favoriteList"
                v-if="currentIndex === 0" :data="favoriteList">
          <div class="list-inner">
            <song-list :songs="favoriteList" @select="selectSong"></song-list>
          </div>
        </scroll>
        <scroll class="list-scroll"
                ref="historyList" v-if="currentIndex === 1"
                :data="playHistory">
          <div class="list-inner">
            <song-list :songs="playHistory" @select="selectSong"
            ></song-list>
          </div>
        </scroll>
      </div>
      <div class="no-result-wrapper" v-if="showNoResult">
        <no-result :title="currentTitle"></no-result>
      </div>
    </div>
  </transition>
</template>
<script>
import switches from 'base/switches/switches'
import scroll from 'base/scroll/scroll'
import SongList from 'base/song-list/song-list'
import NoResult from 'base/no-result/NoResult'
import {mapGetters, mapActions} from 'vuex'
import {playListMixin} from 'common/js/mixin'
import Song from 'common/js/song'
export default {
  name: 'UserCenter',
  mixins: [playListMixin],
  components: {
    switches,
    scroll,
    SongList,
    NoResult
  },
  data () {
    return {
      switches: [
        {
          name: '我喜欢的'
        },
        {
          name: '最近听的'
        }
      ],
      currentIndex: 0
    }
  },
  computed: {
    ...mapGetters([
      'playHistory',
      'favoriteList'
    ]),
    showNoResult () {
      if (this.currentIndex === 0) {
        return this.favoriteList.length < 0
      }
      return this.playHistory.length < 0
    },
    currentTitle () {
      if (this.currentIndex === 0) {
        return '暂无收藏歌曲'
      }
      return '最近无听歌记录'
    }
  },
  methods: {
    selectItem (index) {
      this.currentIndex = index
    },
    back () {
      this.$router.back()
    },
    random () {
      let list = this.currentIndex === 0 ? this.favoriteList : this.playHistory
      if (!list.length) {
        return
      }
      list = list.map((item) => {
        return new Song(item)
      })
      this.randomMusic({
        list
      })
    },
    selectSong (song) {
      this.insertSong(new Song(song))
    },
    handlePlaylistMixin () {
      let bottom = this.playList.length > 0 ? '60px' : 0
      this.$refs.listWrapper.style.bottom = bottom
      this.$refs.favoriteList && this.$refs.favoriteList.refresh()
      this.$refs.historyList && this.$refs.historyList.refresh()
    },
    ...mapActions([
      'insertSong',
      'randomMusic'
    ])
  }
}
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .user-center
    position fixed
    top 0
    bottom 0
    width 100%
    z-index 100
    background $color-background
    &.slide-enter-active, &.slide-leave-active
      transition all 0.3s
    &.slide-enter, &.slide-leave-to
      transform transition3d(100%, 0, 0)
    .back
      position absolute
      top 0
      left 6px
      z-index 50
      .icon-back
        display block
        padding 10px
        font-size $font-size-large-x
        color $color-theme
    .switches-wrapper
      margin 10px 0 30px 0
    .play-btn
      box-sizing border-box
      width 135px
      padding 7px 0
      margin 0 auto
      text-align: center
      border 1px solid $color-text-l
      color $color-text-l
      border-radius 100px
      font-size 0
      .icon-play
        display inline-block
        vertical-align middle
        margin-right 6px
        font-size $font-size-medium-x
      .text
        display inline-block
        vertical-align middle
        font-size $font-size-small
    .list-wrapper
      position absolute
      top 110px
      bottom 0
      width 100%
      .list-scroll
        height 100%
        overflow hidden
        .list-inner
          padding 20px 30px
    .no-result-wrapper
      position absolute
      top 50%
      width 100%
      transform translateY(-50%)
</style>
