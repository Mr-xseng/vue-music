// import {commonParams} from 'api/config'
// import jsonp from 'common/js/jsonp'
// import axios from 'axios'

export default class Song {
  constructor ({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}
export function creatSong (musicData) {
  // const songmid = musicData.songmid
  // const strMediaMid = musicData.strMediaMid
  // getVkey(songmid, strMediaMid).then(res => {
  //   console.log(res.data)
  // })
  // console.log(musicData.songmid)
  // console.log(musicData.strMediaMid)
  // const guid = 7545177545
  // const uin = 0
  if (!musicData) {
    return
  }
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `http://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/C100${musicData.songmid}.m4a?fromtag=0&guid=126548448`
  })
}
function filterSinger (singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((item) => {
    ret.push(item.name)
  })
  return ret.join('/')
}
// export function getVkey (mid, strMediaMid) {
//   const url = '/api/music'
//   const data = Object.assign({}, commonParams, {
//     g_tk: 5381,
//     loginUin: 0,
//     hostUin: 0,
//     format: 'json',
//     platform: 'yqq',
//     needNewCode: 0,
//     cid: 205361747,
//     uin: 0,
//     songmid: mid,
//     filename: `C400${strMediaMid}.m4a`,
//     guid: 7545177545
//   })
//   // return data
//   return axios.get(url, {
//     params: data
//   }).then((res) => {
//     return Promise.resolve(res.data)
//   })
//   // return jsonp(url, data, options)
// }
