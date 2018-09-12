<template>
  <transition name="slide">
    <music-list :songs="songs" :bg-image="bgImage" :title="title"></music-list>
  </transition>
</template>
<script>
import {mapGetters} from 'vuex'
import {creatSong} from 'common/js/song'
import {getSingerDetail} from 'api/singer-detail'
import { ERR_OK } from 'api/config/'
import MusicList from 'components/music-list/music-list'
export default{
  name: 'SingerDetail',
  data () {
    return {
      songs: []
    }
  },
  components: {
    MusicList
  },
  computed: {
    bgImage () {
      return this.singer.avatar
    },
    title () {
      return this.singer.name
    },
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
          // console.log(this.singer)
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
  .slide-enter-active,.slide-leave-active
    transition:all .3s
  .slide-enter,.slide-leave-to
    transform :translate3d(100%,0,0)
</style>
