import { Module } from 'vuex/types'
import coffeeService from '@/api/coffees.api'
import bagService from '@/api/bags.api'
import groundLevelService from '@/api/groundLevels.api'
import deliveryService from '@/api/delivery.api'

interface ProductsState {
  coffees: Array<{coffee_id: number, name: String, description: String, category_id: number}>;
  bags: Array<{bag_id: number, size: String, grams: number}>;
  allGroundLevels: Array<{ground_level_id: number, level_name: String, grinding_fee: number}>;
  allMailPrices: Array<{mail_price_id: number, name: String, price: number}>
}

const state: ProductsState = {
  coffees: [],
  bags: [],
  allGroundLevels: [],
  allMailPrices: []
}

const module: Module<ProductsState, {}> = {
  namespaced: true,
  state,
  mutations: {
    setCoffees: (state, coffees) => {
      state.coffees = coffees
    },
    setBags: (state, bags) => {
      state.bags = bags
    },
    setGroundLevels: (state, groundLevels) => {
      state.allGroundLevels = groundLevels
    },
    setMailPrices: (state, mailPries) => {
      state.allMailPrices = mailPries
    }
  },
  actions: {
    getCustomerCoffees: ({commit}) => {
      coffeeService.getCustomerCoffees()
        .then(coffees => {
          commit('setCoffees', coffees)
        })
    },
    getCustomerBags: ({commit}) => {
      bagService.getCustomerBags()
      .then(bags => {
        commit('setBags', bags);
      }) 
    },
    getAllGroundLevels: ({commit}) => {
      groundLevelService.getAllGroundLevels()
      .then(groundLevels => {
        commit('setGroundLevels', groundLevels)
      })
    },
    getAllMailPrices: ({commit}) => {
      deliveryService.getAllMailPrices()
      .then(mailPrices => {
        commit('setMailPrices', mailPrices)
      })
    }
  }
}

export default module;
