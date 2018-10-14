import storage from 'good-storage'

const SEARCH_KEY = '__SEARCH__'
const SEARCH_MAX_LEN = 15

const PLAY_KEY = '__PLAY__'
const PLAY_MAX_LEN = 200

const FAVORITE_KEY = '__FAVORITE__'
const FAVORITE_MAX_LEN = 200

function insertArray (arr, key, comp, len) {
  let index = arr.findIndex(comp)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(key)
  if (len && arr.length > len) {
    arr.pop()
  }
}

function deleteArrayItem (arr, comp) {
  let index = arr.findIndex(comp)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function saveSearch (query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LEN)
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function deleteSearch (query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteArrayItem(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function clearSearch () {
  storage.remove(SEARCH_KEY)
  return []
}

export function loadSearch () {
  return storage.get(SEARCH_KEY, [])
}

export function savePlay (song) {
  let playHistory = storage.get(PLAY_KEY, [])
  insertArray(playHistory, song, (item) => {
    return item.id === song.id
  }, PLAY_MAX_LEN)
  storage.set(PLAY_KEY, playHistory)
  return playHistory
}

export function loadPlay () {
  return storage.get(PLAY_KEY, [])
}

export function saveFavoriteSong (song) {
  let favoriteList = storage.get(FAVORITE_KEY, [])
  insertArray(favoriteList, song, (item) => {
    return item.id === song.id
  }, FAVORITE_MAX_LEN)
  storage.set(FAVORITE_KEY, favoriteList)
  return favoriteList
}
export function deleteFavoriteSong (song) {
  let favoriteList = storage.get(FAVORITE_KEY, [])
  deleteArrayItem(favoriteList, (item) => {
    return song.id === item.id
  })
  storage.set(FAVORITE_KEY, favoriteList)
  return favoriteList
}

export function loadFavorite () {
  return storage.get(FAVORITE_KEY, [])
}
