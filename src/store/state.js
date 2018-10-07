import {playingMode} from 'common/js/config'
import {loadSearch} from 'common/js/cache'
const state = {
  singer: {},
  playing: false,
  pullScreen: false,
  playList: [],
  sequenceList: [],
  mode: playingMode.sequence,
  currentIndex: -1,
  disc: {},
  topList: {},
  searchHistory: loadSearch()
}
export default state
