import {playingMode} from 'common/js/config'
const state = {
  singer: {},
  playing: false,
  pullScreen: false,
  playList: [],
  sequenceList: [],
  mode: playingMode.sequence,
  currentIndex: -1
}
export default state
