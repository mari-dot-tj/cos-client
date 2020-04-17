import Vue from 'vue'
import Vuex from 'vuex'
import products from './modules/products'
import order from './modules/order'
import delivery from './modules/delivery'
import account from './modules/account'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
  },
  mutations: {
  },
  actions: {
  },
  plugins: [
    createPersistedState({
      paths: ['account'],
    }),
  ],
  modules: {
    products: products,
    order: order,
    delivery: delivery,
    account: account
  }
})
