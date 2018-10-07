import storage from 'good-storage'

const SEARCH_KEY = '__SEARCH__'

const SEARCH_MAX_LEN = 15

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
