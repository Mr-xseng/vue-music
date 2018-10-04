<template>
  <div class="rank" ref="rank">
    <scroll class="topList" :data="topList" ref="topList">
      <ul>
        <li class="item" v-for="(item, index) in topList"
            :key="index" @click="selectItem(item)"
        >
          <div class="icon">
            <img width="100" height="100" :src="item.picUrl">
          </div>
          <ul class=songlist>
            <li class="song" v-for="(song, index) in item.songList" :key="index">
              <span>{{(index + 1)}}</span>
              <span>{{song.singername}} - {{song.songname}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>
<script>
import {getRank} from 'api/rank'
import {ERR_OK} from 'api/config'
import scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {playListMixin} from 'common/js/mixin'
import {mapMutations} from 'vuex'

export default {
  mixins: [playListMixin],
  name: 'Rank',
  data () {
    return {
      topList: []
    }
  },
  components: {
    scroll,
    Loading
  },
  created () {
    this.getRankData()
  },
  methods: {
    getRankData () {
      getRank().then((res) => {
        if (ERR_OK === res.code) {
          this.topList = res.data.topList
          // console.log(this.topList)
        }
      })
    },
    selectItem (item) {
      this.$router.push({
        path: `/rank/${item.id}`
      })
      this.setTopList(item)
    },
    handlePlaylistMixin () {
      const bottom = this.playList.length > 0 ? '60px' : 0
      this.$refs.rank.style.bottom = bottom
      this.$refs.topList.refresh()
    },
    ...mapMutations({
      setTopList: 'SET_TOP_LIST'
    })
  }
}
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/mixin'
  @import '~common/stylus/variable'
  .rank
    position fixed
    bottom 0
    top 88px
    width 100%
    .topList
      height 100%
      overflow: hidden
      .item
        display: flex
        margin 0 20px
        padding-top 20px
        height 100px
        &:last-child
          padding-bottom 20px
        .icon
          flex 0 0 100px
          width 100px
          height: 100px
        .songlist
          flex 1
          display flex
          flex-direction column
          justify-content center
          padding 0 20px
          height 100px
          overflow hidden
          background $color-highlight-background
          color $color-text-l
          font-size 13px
          .song
            no-wrap()
            line-height 26px
      .loading-container
        position absolute
        height: 50%
        width 100%
        transform translateY(50%)
</style>
