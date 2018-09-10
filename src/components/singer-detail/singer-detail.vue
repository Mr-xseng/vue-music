<template>
  <transition name="slide">
    <div class="singer-detail"></div>
  </transition>
</template>
<script>
import {mapGetters} from 'vuex'
import {creatSong} from 'common/js/song'
import {getSingerDetail} from 'api/singer-detail'
// import {getVkey} from 'api/singer'
import { ERR_OK } from 'api/config/'
export default{
  name: 'SingerDetail',
  data () {
    return {
      songs: []
    }
  },
  computed: {
    ...mapGetters([
      'singer'
    ])
  },
  mounted () {
    this.getSingerData()
  },
  methods: {
    getSingerData () {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this.normalized(res.data.list)
          console.log(this.songs)
        }
      })
    },
    normalized (list) {
      let ret = []
      if (!list) {
        return
      }
      list.forEach((item) => {
        let {musicData} = item
        if (musicData.songid && musicData.albummid) {
          ret.push(creatSong(musicData))
        }
      })
      return ret
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .singer-detail
    position fixed
    z-index 100
    top 0
    left 0
    right 0
    bottom 0
    background $color-background
  .slide-enter-active,.slide-leave-active
    transition:all .3s
  .slide-enter,.slide-leave-to
    transform :translate3d(100%,0,0)
</style>
