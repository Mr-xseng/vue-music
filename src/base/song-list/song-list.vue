<template>
  <div class="song-list">
    <ul>
      <li class="item" v-for="(song,index) in songs" :key="index">
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
    }
  },
  methods: {
    getSongDom (song) {
      return `${song.singer}` + `,` + ` ` + `${song.album}`
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
