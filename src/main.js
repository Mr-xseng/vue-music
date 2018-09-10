import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import VueLazyLoad from 'vue-lazyload'
import fastClick from 'fastclick'
import router from './router'
import store from './store/index'
import 'common/stylus/index.styl'

Vue.use(VueLazyLoad, {
  loading: 'common/image/default.png'
})
fastClick.attach(document.body)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
