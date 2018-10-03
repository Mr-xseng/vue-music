import {mapGetters} from 'vuex'
export const playListMixin = {
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  mounted () {
    this.handlePlaylistMixin(this.playList)
  },
  activated () {
    this.handlePlaylistMixin(this.playList)
  },
  watch: {
    playList (newList) {
      this.handlePlaylistMixin(newList)
    }
  },
  methods: {
    handlePlaylistMixin () {
      throw new Error('must be a function of handlePlaylistMixin')
    }
  }
}
