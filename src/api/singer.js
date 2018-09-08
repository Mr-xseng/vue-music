import {commonParams, options} from './config'
import jsonp from 'common/js/jsonp'
// import axios from 'axios'
export function getSingerList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    platform: 'yqq',
    g_tk: 5381,
    loginUin: '0',
    format: 'json',
    needNewCode: 0
  })
  return jsonp(url, data, options)
}
