<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span v-for="(item,index) in dots"
            class="dot" :key="index"
            :class="{active: currentIndex === index}">
      </span>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import { addClassName } from 'common/js/dom'
export default {
  name: 'Slider',
  data () {
    return {
      dots: [],
      currentIndex: 0
    }
  },
  props: {
    sliderLength: {
      type: Number
    },
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  destroyed () {
    clearTimeout(this.timer)
  },
  mounted () {
    setTimeout(() => {
      this.setWidthSlider()
      this.initSlider()
      this.initDot()
      if (this.autoPlay) {
        this.aPlay()
      }
    }, 20)
    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }
      this.setWidthSlider(true)
      this.slider.refresh()
    })
  },
  methods: {
    setWidthSlider (setResize) {
      this.children = this.$refs.sliderGroup.children

      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClassName(child, 'slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop && !setResize) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    initDot () {
      this.dots = new Array(this.sliderLength)
    },
    aPlay () {
      let playPageX = this.currentIndex + 1
      if (this.loop) {
        playPageX = playPageX + 1
      }
      // console.log(playPageX)
      this.timer = setTimeout(() => {
        // console.log(playPageX)
        this.slider.goToPage(playPageX, 0, 400)
        // if (playPageX === this.sliderLength) {
        //   playPageX = 1
        // }
      }, this.interval)
    },
    initSlider () {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400
        // click: true
      })
      this.slider.on('scrollEnd', () => {
        let sliderIndex = this.slider.getCurrentPage().pageX
        // console.log(sliderIndex)
        if (this.loop) {
          sliderIndex -= 1
          // console.log(this.currentIndex)
          // sliderIndex -= 1
        }
        // console.log(this.currentIndex)
        this.currentIndex = sliderIndex
        if (this.autoPlay) {
          clearTimeout(this.timer)
          this.aPlay()
        }
        // console.log(sliderIndex)
      })
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
