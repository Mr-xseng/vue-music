<template>
  <div class="song-list">
    <ul>
      <li class="item" v-for="(song,index) in songs"
          :key="index" @click="selectItem(song, index)">
        <div v-show="rank" class="rank">
          <span :class="getRankCls(index)" v-text="getRankIndex(index)"></span>
        </div>
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">
            {{getSongDom(song)}}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'SongList',
  props: {
    songs: {
      type: Array,
      default: null
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getSongDom (song) {
      return `${song.singer}` + `,` + ` ` + `${song.album}`
    },
    selectItem (item, index) {
      this.$emit('select', item, index)
    },
    getRankCls (index) {
      if (index <= 2) {
        return `icon icon${index}`
      } else {
        return 'text'
      }
    },
    getRankIndex (index) {
      if (index > 2) {
        return index + 1
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .song-list
    .item
      display flex
      align-items center
      box-sizing border-box
      height: 64px
      font-size $font-size-medium
      .rank
        flex 0 0 25px
        width 25px
        margin-right 30px
        text-align center
        .icon
          display inline-block
          width 25px
          height: 24px
          background-size 25px 24px
          &.icon0
            bg-image('first')
          &.icon1
            bg-image('first')
          &.icon2
            bg-image('first')
        .text
          color $color-theme
          font-size $font-size-large
      .content
        flex 1
        line-height 20px
        overflow hidden
        .name
          no-wrap()
          color $color-text
        .desc
          no-wrap()
          margin-top 7px
          color gray
</style>
