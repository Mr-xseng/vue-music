import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const recommend = (resolve) => {
  import('@/components/recommend/recommend').then((moudle) => {
    resolve(moudle)
  })
}

const search = (resolve) => {
  import('@/components/search/search').then((moudle) => {
    resolve(moudle)
  })
}

const singer = (resolve) => {
  import('@/components/singer/singer').then((moudle) => {
    resolve(moudle)
  })
}

const rank = (resolve) => {
  import('@/components/rank/rank').then((moudle) => {
    resolve(moudle)
  })
}

const SingerDetail = (resolve) => {
  import('@/components/singer-detail/singer-detail').then((moudle) => {
    resolve(moudle)
  })
}

const Disc = (resolve) => {
  import('@/components/desc/desc').then((moudle) => {
    resolve(moudle)
  })
}

const topList = (resolve) => {
  import('@/components/top-list/topList').then((moudle) => {
    resolve(moudle)
  })
}

const UserCenter = (resolve) => {
  import('@/components/user-center/user-center').then((moudle) => {
    resolve(moudle)
  })
}
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
      component: search,
      children: [{
        path: ':id',
        component: SingerDetail
      }]
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
      component: rank,
      children: [{
        path: ':id',
        component: topList
      }]
    },
    {
      path: '/user',
      component: UserCenter
    }
  ]
})
