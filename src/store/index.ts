import Vue from 'vue'
import Vuex from 'vuex'
import order from './modules/order'
import account from './modules/account'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    loader: false
  },
  mutations: {
    setLoader: (state, boolean) => {
      (<any>state).loader = boolean
    },
  },
  actions: {
    toggleLoader: ({commit}, boolean) => {
      commit('setLoader', boolean)
    }
  },
  plugins: [
    createPersistedState({
      paths: ['account', 'order'],
    }),
  ],
  modules: {
    order: order,
    account: account
  }
})
