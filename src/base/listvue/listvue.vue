<template>
  <scroll :data="data" class="listview"
          ref="listview"
          :listenScroll="listenScroll"
          @scroll="scroll"
          :probeType="probeType"
  >
    <ul>
      <li class="list-group" v-for="(group,index) in data"
          :key="index" ref="listGroup"
      >
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="(item, index) in group.items"
              :key="index" class="list-group-item"
              @click="selectItem(item)"
          >
            <img v-lazy="item.avatar" class="avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="handleTouchStart"
         @touchmove.stop.prevent="handleTouchMove"
         @touchend="handleTouchEnd">
      <ul>
        <li
          class="item" v-for="(item, index) in shortList"
          :key="index" :ref="item" :data-index="index"
          :class="{'current': currentIndex === index}"
        >{{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" v-show="flexTitle" ref="fixed">
      <h2 class="fixed-title">{{flexTitle}}</h2>
    </div>
    <loading class="loading-container" v-show="!data.length"></loading>
  </scroll>
</template>
<script>
import scroll from 'base/scroll/scroll'
import { getSingerKeyEle } from 'common/js/dom'
import Loading from 'base/loading/loading'
const HOT_HEIGHT = 18
const TITLE_HEIGHT = 30
export default {
  name: 'ListView',
  data () {
    return {
      status: 0,
      flagTouch: Boolean,
      currentIndex: 0,
      scrollY: -1,
      probeType: 3,
      diff: -1
    }
  },
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  computed: {
    shortList () {
      return this.data.map((group) => {
        return group.title.substring(0, 1)
      })
    },
    flexTitle () {
      if (this.scrollY > 0) {
        return
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  updated () {
    this.status = this.$refs['热'][0].offsetTop
  },
  created () {
    this.listenScroll = true
    this.listHeight = []
  },
  methods: {
    selectItem (item) {
      this.$emit('handleSelectItem', item)
    },
    handleTouchStart (e) {
      this.flagTouch = true
      // console.log('index')
      // let firstTouch = e.touches[0]
      // this.touches.y1 = firstTouch.pageY
      let anchorIndex = getSingerKeyEle(e.target, 'index')
      // console.log(anchorIndex)
      // this.touches.abchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    handleTouchMove (e) {
      if (this.flagTouch) {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          const firstTouch = e.touches[0].clientY - 190
          // console.log(firstTouch)
          const heightIndex = Math.floor((firstTouch - this.status) / HOT_HEIGHT)
          // this.currentIndex = heightIndex
          // console.log(heightIndex)
          // this.touches.y2 = firstTouch.pageY
          // let currentHeight = this.touches.y2 - this.touches.y1
          // console.log(currentHeight)
          // let currentIndex = Math.floor(currentHeight / HOT_HEIGHT)
          // let newIndex = parseInt(currentIndex + this.touches.abchorIndex)
          this._scrollTo(heightIndex)
        }, 16)
      }
    },
    _scrollTo (index) {
      if (!index && index !== 0) {
        return
      }
      // console.log(index)
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        // console.log(this.listHeight.length)
        index = this.listHeight.length - 2
      }
      // console.log(index)
      this.scrollY = -this.listHeight[index]
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index])
    },
    handleTouchEnd () {
      this.flagTouch = false
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    getListHeight () {
      this.listHeight = []
      let height = 0
      let list = this.$refs.listGroup
      // console.log(list)
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this.getListHeight()
      }, 20)
    },
    scrollY (newY) {
      const listHeight = this.listHeight
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      for (let i = 0; i < listHeight.length; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.diff = height2 + newY
          this.currentIndex = i
          // console.log(this.currentIndex)
        }
      }
    },
    diff (diffY) {
      const fixedTop = (diffY > 0 && diffY < TITLE_HEIGHT) ? diffY - TITLE_HEIGHT : 0
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
    }
  },
  components: {
    scroll,
    Loading
  }
}
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .listview,oo2
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
    .loading-container
      position absolute
      width 100%
      height 50%
      transform translateY(-50%)
</style>
