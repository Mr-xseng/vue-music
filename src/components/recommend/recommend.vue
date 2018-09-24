<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content" :data="getDiscList">
      <div>
        <div class="slider-wrapper" v-if="sliderData.length">
          <slider :sliderLength="sliderLength">
            <div v-for="item in sliderData" :key="item.id">
                <a :href="item.linkUrl">
                  <img :src="item.picUrl" @load="loadImag">
                </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li class="item" v-for="(item,index) of getDiscList" :key="index">
              <div class="icon">
                <img v-lazy=item.imgurl width="60" height="60">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <loading class="loading-container" v-show="!sliderData.length"></loading>
    </scroll>
    <!--<router-view></router-view>-->
  </div>
</template>
<script>
import { getRecommend, getDiscList } from 'api/recommend'
import { ERR_OK } from 'api/config'
import Slider from 'base/swiper/slider'
import scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
export default {
  name: 'Recommend',
  data () {
    return {
      sliderData: [],
      sliderLength: 0,
      getDiscList: []
    }
  },
  components: {
    Slider,
    scroll,
    Loading
  },
  created () {
    this.getRecommendInfo()
    this.getDiscListInfo()
  },
  methods: {
    getRecommendInfo () {
      getRecommend().then(this.getRecommendData)
    },
    getRecommendData (xhr) {
      const currentData = xhr.data
      // console.log(currentData)
      if (!ERR_OK && currentData) {
        const swiperData = currentData.slider
        // console.log(swiperData)
        this.sliderData = swiperData
        // console.log(this.sliderData)
        this.sliderLength = swiperData.length
      }
    },
    getDiscListInfo () {
      getDiscList().then((res) => {
        const listData = res.data
        if (!ERR_OK && listData) {
          this.getDiscList = listData.list
          // console.log(this.getDiscList)
        }
      })
    },
    loadImag () {
      if (!this.checkLoad) {
        this.checkLoad = true
        this.$refs.scroll.refresh()
      }
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
          /*overflow: hidden*/
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            margin-left 20px
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
