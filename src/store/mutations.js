import * as types from './mutation-types'
const mutations = {
  [types.SET_SINGER] (state, singer) {
    state.singer = singer
  },
  [types.SET_PLAYING_STATE] (state, flag) {
    state.playing = flag
  },
  [types.SET_PULL_SCREEN] (state, flag) {
    state.pullScreen = flag
  },
  [types.SET_PLAYLIST] (state, list) {
    state.playList = list
  },
  [types.SET_SEQUENCE_LIST] (state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAY_MODE] (state, index) {
    state.mode = index
  },
  [types.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  },
  [types.SET_DISC] (state, disc) {
    state.disc = disc
  },
  [types.SET_TOP_LIST] (state, topList) {
    state.topList = topList
  },
  [types.SET_SEARCH_HISTORY] (state, searches) {
    state.searchHistory = searches
  },
  [types.SET_PLAY_HISTORY]  (state, playHistory) {
    state.playHistory = playHistory
  },
  [types.SET_FAVORITE_LIST] (state, list) {
    state.favoriteList = list
  }
}
export default mutations
