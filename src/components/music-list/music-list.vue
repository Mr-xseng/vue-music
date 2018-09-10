<template>
  <div class="music-list">
    <div class="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title"></h1>
    <div class="bg-image">
      <div class="filter"></div>
    </div>
  </div>
</template>
<script>
// import {getVkey} from 'common/js/song'
export default{
  name: 'MusicList'
  // mounted () {
  //   this.getnusicKey()
  // },
  // methods: {
  //   getnusicKey () {
  //     getVkey('003jjoM94WLiTf', '002Jbzn235xaQZ').then((res) => {
  //       console.log(res.data)
  //     })
  //   }
  // }
}
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable
  @import '~common/stylus/mixin'
  .music-list
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    z-index 100
    background $color-background
    .back
      position absolute
      top 0
      left 6px
      z-index 50
      .icon-back
        display block
        padding 10px
        color $color-theme
</style>
