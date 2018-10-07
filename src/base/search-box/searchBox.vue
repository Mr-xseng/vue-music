<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input class="box" v-model="query" :placeholder="placeholder" ref="query">
    <i class="icon-dismiss" v-show="query" @click="remove"></i>
  </div>
</template>
<script>
import {debounce} from 'common/js/shuff-music'
export default {
  name: 'SearchBox',
  props: {
    placeholder: {
      type: String,
      default: '搜索歌手·歌曲'
    }
  },
  data () {
    return {
      query: ''
    }
  },
  methods: {
    remove () {
      this.query = ''
    },
    acceptQuery (key) {
      this.query = key
    },
    blur () {
      this.$refs.query.blur()
    }
  },
  created () {
    this.$watch('query', debounce((newQ) => {
      this.$emit('query', newQ)
    }, 200))
  }
}
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .search-box
    display flex
    align-items center
    box-sizing border-box
    width 100%
    padding 0 6px
    height: 40px
    background $color-highlight-background
    .icon-search
      font-size 24px
      color $color-background
    .box
      flex 1
      margin 0 5px
      line-height 18px
      background  $color-highlight-background
      color $color-text
      font-size $font-size-medium
      outline 0
      &:placeholder
        color $color-text-d
    .icon-dismiss
      font-size 16px
      color $color-background
</style>
