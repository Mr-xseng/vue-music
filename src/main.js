import Vue from 'vue'
import App from './App'
// import fastClick 'fastclick'
// import router from './router'
import 'common/stylus/index.styl'

// fastClick.attach(document.body)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  render: h => h(App)
})
