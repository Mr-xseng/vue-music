<template>
  <div class="progress-bar" ref="progressBar">
    <div class="progress-banner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn">
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
  watch: {
    percent (newPercent) {
      if (newPercent >= 0) {
        const progressWidth = this.$refs.progressBar.clientWidth
        const currentWidth = progressWidth - CURRENT_WIDTH
        const offsetWidth = currentWidth * newPercent
        this.$refs.progress.style.width = `${offsetWidth}px`
        this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0 ,0)`
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
