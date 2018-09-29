import * as types from './mutation-types'
import {playingMode} from 'common/js/config'
import {shuffMusicList} from 'common/js/shuff-music'

function findIndex (list, song) {
  list.findIndex((item) => {
    return item.id === song.id
  })
}

export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  if (this.mode === playingMode.random) {
    let randomList = shuffMusicList(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_PULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}
export const randomMusic = function ({commit}, {list}) {
  commit(types.SET_PLAY_MODE, playingMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shuffMusicList(list)
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_PULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}
