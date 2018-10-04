import {commonParams, options} from './config'
import jsonp from 'common/js/jsonp'

export function getRank () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    uin: 0,
    platform: 'h5',
    needNewCode: 1
  })
  return jsonp(url, data, options)
}

export function getRankMusicList (topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  const data = Object.assign({}, commonParams, {
    topid,
    g_tk: 5381,
    needNewCode: 1,
    platform: 'h5',
    tpl: 3,
    page: 'detail',
    type: 'top',
    format: 'json'
  })
  return jsonp(url, data, options)
}
