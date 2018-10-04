<template>
  <transition name="slide">
    <music-list :title="title" :bgImage="bgImage" :songs="songs" :rank="rank"></music-list>
  </transition>
</template>
<script>
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getRankMusicList} from 'api/rank'
import {ERR_OK} from 'api/config'
import {creatSong} from 'common/js/song'

export default {
  name: 'topList',
  components: {
    MusicList
  },
  data () {
    return {
      songs: [],
      rank: true
    }
  },
  created () {
    this.getRankMusic()
  },
  computed: {
    title () {
      return this.topList.topTitle
    },
    bgImage () {
      if (this.songs.length) {
        return this.songs[0].image
      } else {
        return ''
      }
    },
    ...mapGetters([
      'topList'
    ])
  },
  methods: {
    getRankMusic () {
      if (!this.topList.id) {
        this.$router.push('/rank')
        return
      }
      getRankMusicList(this.topList.id).then((res) => {
        if (ERR_OK === res.code) {
          this.songs = this.normalMusic(res.songlist)
        }
      })
    },
    normalMusic (list) {
      let ret = []
      list.forEach((music) => {
        const musicData = music.data
        if (musicData.songmid && musicData.albummid) {
          ret.push(creatSong(musicData))
        }
      })
      return ret
    }
  }
}
</script>
<style lang="stylus" scoped>
  .slide-enter-active, slide-leave-active
    transition all 0.3s
  .slide-leave, .slide-enter
    transform translate3d(100%, 0, 0)
</style>
