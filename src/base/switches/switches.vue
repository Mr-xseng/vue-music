<template>
  <ul class="switches">
    <li v-for="(item, index) in switches"
        class="switches-item"
        :class="{active: currentIndex === index}"
        :key="index"
        @click="switchesItem(index)"
    >
      <span v-html="item.name"></span>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'switches',
  props: {
    switches: {
      type: Array,
      default: null
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    switchesItem (index) {
      this.$emit('switchesItem', index)
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .switches
    display  flex
    width 240px
    align-items:center
    margin 0 auto
    border 1px solid $color-highlight-background
    border-radius 5px
    .switches-item
      flex 1
      text-align center
      font-size $font-size-medium
      color $color-text-d
      padding 8px
      &.active
        background $color-highlight-background
        color $color-text
</style>
