import {mapGetters, mapMutations, mapActions} from 'vuex'
import {playingMode} from './config'
import {shuffMusicList} from './shuff-music'

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

export const playMixin = {
  computed: {
    iconMode () {
      if (this.mode === playingMode.sequence) {
        return 'icon-sequence'
      } else if (this.mode === playingMode.loop) {
        return 'icon-loop'
      } else {
        return 'icon-random'
      }
    },
    ...mapGetters([
      'sequenceList',
      'mode',
      'playList',
      'currentSong'
    ])
  },
  methods: {
    changeMode () {
      const modeIndex = (this.mode + 1) % 3
      let list = null
      this.setPlayModeIndex(modeIndex)
      if (this.mode === playingMode.random) {
        list = shuffMusicList(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.findIndex(list)
      this.setPlayingList(list)
    },
    findIndex (list) {
      const index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    ...mapMutations({
      setPlayModeIndex: 'SET_PLAY_MODE',
      setPlayingList: 'SET_PLAY_LIST',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayingState: 'SET_PLAYING_STATE'
    })
  }
}

export const searchMixin = {
  data () {
    return {
      query: '',
      refreshDelay: 120
    }
  },
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    addQuery (key) {
      this.$refs.searchBox.acceptQuery(key)
    },
    handleQuery (value) {
      this.query = value
    },
    listenScroll () {
      this.$refs.searchBox.blur()
    },
    saveSearch () {
      this.saveSearchHistory(this.query)
      // console.log(this.searchHistory)
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory'
    ])
  }
}

export const favoriteMixin = {
  computed: {
    ...mapGetters([
      'favoriteList'
    ])
  },
  methods: {
    findFavoriteSong (song) {
      const index = this.favoriteList.findIndex((item) => {
        return item.id === song.id
      })
      return index > -1
    },
    toggleFavoriteSong (item) {
      if (this.findFavoriteSong(item)) {
        this.deleteFavorite(item)
      } else {
        this.saveFavorite(item)
      }
    },
    favoriteIcon (item) {
      if (this.findFavoriteSong(item)) {
        return 'icon-favorite'
      }
      return 'icon-not-favorite'
    },
    ...mapActions([
      'saveFavorite',
      'deleteFavorite'
    ])
  }
}
