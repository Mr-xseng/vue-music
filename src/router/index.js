import Vue from 'vue'
import Router from 'vue-router'
import recommend from '@/components/recommend/recommend'
import search from '@/components/search/search'
import singer from '@/components/singer/singer'
import rank from '@/components/rank/rank'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: recommend
    },
    {
      path: '/search',
      component: search
    },
    {
      path: '/singer',
      component: singer
    },
    {
      path: '/rank',
      component: rank
    }
  ]
})
