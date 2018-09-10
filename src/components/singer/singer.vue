<template>
  <div class="singer">
    <list-view :data="singers" @handleSelectItem="pushItem"></list-view>
    <router-view></router-view>
  </div>
</template>
<script>
import { getSingerList } from 'api/singer'
import Singer from 'common/js/Singer'
import {ERR_OK} from 'api/config'
import ListView from 'base/listvue/listvue'
import {mapMutations} from 'vuex'
const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10
export default {
  name: 'Singer',
  data () {
    return {
      singers: []
    }
  },
  components: {
    ListView
  },
  created () {
    this.getSingerData()
  },
  methods: {
    pushItem (singer) {
      this.$router.push(
        {
          path: `/singer/${singer.id}`
        }
      )
      this.setSinger(singer)
    },
    getSingerData () {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          this.singers = this.normalizeSinger(res.data.list)
        }
      })
    },
    normalizeSinger (list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }
        const keyWord = item.Findex
        if (!map[keyWord]) {
          map[keyWord] = {
            title: keyWord,
            items: []
          }
        }
        map[keyWord].items.push(new Singer({
          name: item.Fsinger_name,
          id: item.Fsinger_mid
        }))
      })
      let ret = []
      let hot = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  }
}
</script>
<style lang="stylus" scoped>
  .singer
    position fixed
    bottom 0
    top 88px
    width 100%
</style>
