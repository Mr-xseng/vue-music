<template>
  <transition name="confirm-fade">
    <div class="confirm" v-show="showFlag">
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <p class="text">{{contentText}}</p>
          <div class="operate">
            <div class="operate-btn left" @click="cancel">{{confirmText}}</div>
            <div class="operate-btn" @click="confirm">{{cancelText}}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default{
  name: 'Confirm',
  data () {
    return {
      showFlag: false,
      confirmText: '取消',
      cancelText: '清空'
    }
  },
  props: {
    contentText: {
      type: String,
      default: '确定要清空所有搜索历史吗?'
    }
  },
  methods: {
    show () {
      this.showFlag = true
    },
    hide () {
      this.showFlag = false
    },
    confirm () {
      this.hide()
      this.$emit('confirm')
    },
    cancel () {
      this.hide()
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .confirm
    position fixed
    left 0
    right 0
    top 0
    bottom 0
    background: $color-background-d
    z-index 998
    &.confirm-fade-enter-active
      animation confirm-fade-in 0.3s
      .confirm-content
        animation confirm-zoom 0.3s
    .confirm-wrapper
      position absolute
      top 50%
      left 50%
      transform  translate(-50%, -50%)
      z-index 999
      .confirm-content
        width 270px
        border-radius 17px
        background $color-highlight-background
        .text
          padding 19px 15px
          line-height 22px
          align-items center
          text-align center
          font-size $font-size-large
          color $color-text-l
        .operate
          display flex
          align-items center
          text-align: center;
          font-size $font-size-large
          .operate-btn
            flex 1
            line-height 22px
            padding 10px 0
            border 1px solid $color-background-d
            color $color-text-d
            &.left
              border 1px solid $color-background-d
  @keyframes confirm-fade-in
    0%
      opacity 0
    100%
      opacity 1
  @keyframes confirm-zoom
    0%
      transfrom scale(0)
    50%
      transform scale(1.1)
    100%
      transfrom scale(1)
</style>
