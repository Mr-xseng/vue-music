import Vue from 'vue'
import Router from 'vue-router'
import recommend from '@/components/recommend/recommend'
import search from '@/components/search/search'
import singer from '@/components/singer/singer'
import rank from '@/components/rank/rank'
import SingerDetail from '@/components/singer-detail/singer-detail'
import Disc from '@/components/desc/desc'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/search',
      component: search
    },
    {
      path: '/singer',
      component: singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: rank
    }
  ]
})
