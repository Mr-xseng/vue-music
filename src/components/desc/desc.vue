<template>
  <transition name="slide">
    <recommend-list :title="title" :bgImage="bgImage" :songs="songs"></recommend-list>
  </transition>
</template>
<script>
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getRecommendMusicList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import {creatSong} from 'common/js/song'

export default {
  name: 'Disc',
  components: {
    'recommend-list': MusicList
  },
  data () {
    return {
      songs: []
    }
  },
  created () {
    this.getRecommendMusic()
  },
  computed: {
    title () {
      return this.disc.dissname
    },
    bgImage () {
      return this.disc.imgurl
    },
    ...mapGetters([
      'disc'
    ])
  },
  methods: {
    getRecommendMusic () {
      if (!this.disc.dissid) {
        this.$router.push('/recommend')
      }
      getRecommendMusicList(this.disc.dissid).then((res) => {
        if (ERR_OK === res.code) {
          this.songs = this._normalData(res.cdlist[0].songlist)
        }
      })
    },
    _normalData (songList) {
      let ret = []
      songList.forEach((item) => {
        if (item.songmid && item.albummid) {
          ret.push(creatSong(item))
        }
      })
      return ret
    }
  }
}
</script>
<style lang="stylus" scoped>
  .slide-enter-active, .slide-leave-active
    transition all 0.3s
  .slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)
</style>
