<template>
  <transition name="drop">
    <div class="top-tip" @click.stop="hide" v-if="showFlag">
      <slot></slot>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'TopTip',
  props: {
    delayTime: {
      type: Number,
      default: 2000
    }
  },
  data () {
    return {
      showFlag: false
    }
  },
  methods: {
    show () {
      this.showFlag = true
      setTimeout(() => {
        this.hide()
      }, this.delayTime)
    },
    hide () {
      this.showFlag = false
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .top-tip
    position fixed
    width 100%
    top 0
    z-index 500
    background $color-highlight-background
    &.drop-enter-active, &.drop-leave-active
      transition all 0.3s
    &.drop-enter, &.drop-leave-to
      transform translate3d(0, -100%, 0)
</style>
