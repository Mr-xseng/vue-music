<template>
  <div class="progress-bar" ref="progressBar" @click="clickMusicProgress">
    <div class="progress-banner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
           @touchstart.prevent="progressTouchStart"
           @touchmove.prevent="progressTouchMove"
           @touchend="progressEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>
<script>
import {prefixSty} from 'common/js/dom'
const CURRENT_WIDTH = 16
const transform = prefixSty('transform')
export default {
  name: 'ProgressBar',
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  created () {
    this.touch = {}
  },
  methods: {
    clickMusicProgress (e) {
      const progressRect = this.$refs.progressBar.getBoundingClientRect()
      const offsetWidth = e.pageX - progressRect.left
      this._progressOffset(offsetWidth)
      this.handlePercent()
    },
    progressTouchStart (e) {
      this.touch.initiazed = true
      this.touch.leftX = this.$refs.progress.clientWidth
      this.touch.startX = e.touches[0].pageX
    },
    progressTouchMove (e) {
      if (!this.touch.initiazed) {
        return
      }
      const contX = e.touches[0].pageX - this.touch.startX
      const currentWidth = this.$refs.progressBar.clientWidth - CURRENT_WIDTH
      this.touch.offsetWidth = Math.min(currentWidth, Math.max(0, contX + this.touch.leftX))
      this._progressOffset(this.touch.offsetWidth)
    },
    progressEnd () {
      this.touch.initiazed = false
      this.handlePercent()
    },
    handlePercent () {
      const barWidth = this.$refs.progressBar.clientWidth - CURRENT_WIDTH
      const percent = this.$refs.progress.clientWidth / barWidth
      this.$emit('progressMove', percent)
    },
    _progressOffset (offsetWidth) {
      this.$refs.progress.style.width = `${offsetWidth}px`
      this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0 ,0)`
    }
  },
  watch: {
    percent (newPercent) {
      if (newPercent >= 0 && !this.touch.initiazed) {
        const progressWidth = this.$refs.progressBar.clientWidth
        const currentWidth = progressWidth - CURRENT_WIDTH
        const offsetWidth = currentWidth * newPercent
        this._progressOffset(offsetWidth)
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .progress-bar
    height: 30px
    .progress-banner
      position relative
      top 13px
      height: 4px
      background rgba(0 0 0 .3)
      .progress
        position: absolute
        height: 100%
        background $color-theme
      .progress-btn-wrapper
        position absolute
        left: -8px
        top -13px
        width 38px
        height: 30px
        .progress-btn
          position: relative
          left: 7px
          top 7px
          box-sizing border-box
          width 16px
          height: 16px
          border 3px solid $color-text
          border-radius 50%
          background $color-theme
</style>
