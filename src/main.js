import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import VueLazyload from 'vue-lazyload'
import fastClick from 'fastclick'
import router from './router'
import store from './store/index'
import 'common/stylus/index.styl'

/* eslint-disable no-unused-vars */
// import Vconsole from 'vconsole'
//
// let vconsole = new Vconsole()
//
// export default vconsole

// console.log('hello world')

// function noop () {
// }
//
// window.MessageChannel = noop
// window.setImmediate = noop

Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
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
