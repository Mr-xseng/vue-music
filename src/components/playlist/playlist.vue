<template>
  <transition name="list-fade">
    <div class="playList" v-show="showFlag" @click="hide">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <i class="icon" :class="getIconMode"></i>
            <span class="text">{{getModeText}}</span>
            <span class="clear">
              <i class="icon-clear"></i>
            </span>
          </h1>
        </div>
        <scroll class="list-content" :data="sequenceList" ref="listContent">
          <transition-group name="list" tag="ul" ref="list">
            <li class="item" :key="index"
                v-for="(item, index) in sequenceList"
                @click="selectItem(item, index)"
            >
              <i class="current" :class="getPlayIcon(item)"></i>
              <span class="text" v-html="item.name"></span>
              <span class="like" @click.stop="toggleFavoriteSong(item)">
                <i :class="favoriteIcon(item)"></i>
              </span>
              <span class="delete" @click.stop="deleteOne(item)">
                <i class="icon-delete"></i>
              </span>
            </li>
          </transition-group>
        </scroll>
        <div class="list-operate">
          <div class="add">
            <i class="icon-add"></i>
            <span class="text">添加到播放列表</span>
          </div>
        </div>
        <div class="list-close" @click=hide>
          <span>关闭</span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import scroll from 'base/scroll/scroll'
import {playingMode} from 'common/js/config'
export default {
  name: 'PlayList',
  data () {
    return {
      showFlag: false,
      favoriteList: []
    }
  },
  computed: {
    ...mapGetters([
      'sequenceList',
      'mode',
      'playList',
      'currentSong'
    ]),
    getModeText () {
      return this.mode === playingMode.sequence ? '顺序播放' : this.mode === playingMode.random ? '随机播放' : '单曲循环'
    },
    getIconMode () {
      if (this.mode === playingMode.sequence) {
        return 'icon-sequence'
      } else if (this.mode === playingMode.loop) {
        return 'icon-loop'
      } else {
        return 'icon-random'
      }
    }
  },
  components: {
    scroll
  },
  methods: {
    show () {
      this.showFlag = true
      setTimeout(() => {
        this.$refs.listContent.refresh()
        this.getCurrentScroll(this.currentSong)
      }, 20)
    },
    hide () {
      this.showFlag = false
    },
    getPlayIcon (item) {
      if (item.id === this.currentSong.id) {
        return 'icon-play-mini'
      }
    },
    favoriteIcon (item) {
      if (this.getFavoriteSong(item)) {
        return 'icon-favorite'
      } else {
        return 'icon-not-favorite'
      }
    },
    selectItem (item, index) {
      let newIndex
      if (this.mode === playingMode.random) {
        newIndex = this.playList.findIndex((song) => {
          return song.id === item.id
        })
      } else {
        newIndex = index
      }
      this.setCurrentIndex(newIndex)
      this.setState(true)
    },
    deleteOne (song) {
      this.deleteSong(song)
    },
    toggleFavoriteSong (song) {
      if (this.getFavoriteSong(song)) {
        this.deleteFavoriteSong(song)
      } else {
        this.saveFavoriteSong(song)
      }
    },
    saveFavoriteSong (song) {
      this.favoriteList.push(song)
    },
    deleteFavoriteSong (item) {
      const index = this.favoriteList.findIndex((song) => {
        return item.id === song.id
      })
      this.favoriteList.splice(index, 1)
    },
    getFavoriteSong (item) {
      const index = this.favoriteList.findIndex((song) => {
        return item.id === song.id
      })
      return index > -1
    },
    getCurrentScroll (current) {
      const index = this.sequenceList.findIndex((song) => {
        return current.id === song.id
      })
      this.$refs.listContent.scrollToElement(this.$refs.list.$el.children[index], 300)
      // console.log(index)
    },
    ...mapMutations({
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setState: 'SET_PLAYING_STATE'
    }),
    ...mapActions([
      'deleteSong'
    ])
  },
  watch: {
    currentSong (newSong, oldSong) {
      if (!this.showFlag || oldSong.id === newSong.id) {
        return
      }
      setTimeout(() => {
        this.getCurrentScroll(newSong)
        // console.log(newSong)
      }, 20)
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .playList
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 200
    background $color-background-d
    &.list-fade-enter-active, &.list-fade-leave-active
      transition opacity 0.3s
      .list-wrapper
        transition all 0.3s
    &.list-fade-enter, &.list-fade-enter, &.list-fade-leave-to
      opacity 0
      .list-wrapper
        transform translate3d(0, 100%, 0)
    .list-wrapper
      position absolute
      left 0
      bottom 0
      width 100%
      background-color: $color-highlight-background
      .list-header
        position relative
        padding 20px 30px 10px 20px
        .title
          display flex
          align-items center
          .icon
            margin-right 10px
            font-size 30px
            color $color-theme-d
          .text
            flex 1
            font-size $font-size-medium
            color $color-text-l
          .clear
            extend-click()
            .icon-clear
              font-size $font-size-medium
              color $color-text-d
      .list-content
        max-height 240px
        overflow hidden
        .item
          display flex
          align-items center
          padding 0 30px 0 20px
          height 40px
          overflow hidden
          &.list-enter-active, &.list-leave-active
            transition all 0.1s
          &.list-enter, &.list-leave-to
            height:0
          .current
            flex 0 0 20px
            width 20px
            font-size $font-size-small
            color $color-theme-d
          .text
            flex 1
            no-wrap()
            font-size $font-size-medium
            color $color-text-d
          .like
            extend-click()
            margin-right 15px
            font-size $font-size-small
            color $color-theme
            .icon-favorite
              color $color-sub-theme
          .delete
            extend-click()
            font-size $font-size-small
            color $color-theme
      .list-operate
        width 140px
        margin 20px auto 30px auto
        .add
          display flex
          align-items:center
          padding 8px 16px
          border 1px solid $color-text-l
          border-radius 100px
          color $color-text-l
          .icon-add
            margin-right 6px
            font-size $font-size-small-s
          .text
            font-size $font-size-small
      .list-close
        text-align: center
        line-height 50px
        background $color-background
        font-size $font-size-medium-x
        color $color-text-l
</style>
