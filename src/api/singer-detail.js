import {commonParams, options} from './config'
import jsonp from 'common/js/jsonp'
// import state from '@/store/state'
export function getSingerDetail (singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  // const singerId = state.singer.id
  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    jsonCallback: 'MusicJsonCallbacksinger_track',
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    singermid: singerId,
    order: 'listen',
    begin: 0,
    num: 100,
    songstatus: 1
  })
  return jsonp(url, data, options)
}
