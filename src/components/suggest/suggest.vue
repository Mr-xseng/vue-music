<template>
  <div class="suggest">
    <ul class="suggest-list">
      <li class="suggest-item">
        <div class="icon">
          <i class=""></i>
        </div>
        <div class="name">
          <p class="text"></p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import {search} from 'api/search'
import {ERR_OK} from 'api/config'

export default{
  name: 'Suggest',
  data () {
    return {
      page: 1
    }
  },
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    search () {
      console.log(this.query)
      search(this.query, this.page, this.showSinger).then((res) => {
        if (ERR_OK === res.code) {
          console.log(res.data)
        }
      })
    }
  },
  watch: {
    query (newQ) {
      this.search(newQ)
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'

  .suggest
    height 100%
    overflow hidden
    .suggest-list
      pading 0 30px
      .suggest-item
        display flex
        align-items center
        padding-bottom 20px
      .icon
        flex 0 0 30px
        width 30px
        [class^="icon-"]
          font-size 14px
          color $color-text-d
      .name
        flex 1
        font-size $font-size-medium
        color $color-text-d
        overflow hidden
        .text
          no-wrap()
</style>
