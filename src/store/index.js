import Vue from 'vue'
import Vuex from 'vuex'
import * as action from './actions'
import * as getters from './getters'
import mutations from './mutations'
import state from './state'
import createlogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  action,
  getters,
  mutations,
  strict: debug,
  plugins: debug ? [createlogger()] : []
})
