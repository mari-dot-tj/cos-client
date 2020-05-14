import { Module } from 'vuex/types'
import orderService from '@/api/orders.api'

interface OrderItem{
    item_id: number;
    coffee_id: number;
    coffee_name: string;
    weight: string;
    grams: number;
    bag_id: number;
    ground_level: string;
    ground_level_id: number;
    amount: number;
}

interface OrderState{
  itemId: number;
  items: Array<OrderItem>;
  delivery_id: number;
  orderType: String;
  interval?: number;
  dayOfWeek?: number;
  info: String;
}

const state: OrderState = {
    itemId: 1,
    items: [],
    delivery_id: 1,
    orderType: '',
    interval: 0,
    dayOfWeek: 0,
    info: ''
}

const module: Module<OrderState, {}> = {
  namespaced: true,
  state,
  mutations: {
    setItems: (state, {items}) => {
      state.items = items
    },
    setDeliveryId: (state, delivery_id) => {
      state.delivery_id = delivery_id
    },
    setOrderType: (state, orderType) => {
      state.orderType = orderType
    },
    setInterval: (state, interval) => {
      state.interval = interval
    },
    setDayOfWeek: (state, dayOfWeek) => {
      state.dayOfWeek = dayOfWeek
    },
    setInfo: (state, info) => {
      state.info = info
    },
    /* adds item object to state item list */
    pushProductToOrder: (state, {item_id, coffee_id, coffee_name, weight, grams, bag_id, ground_level, ground_level_id, amount}) => {
      state.items.push({
          item_id,
          coffee_id,
          coffee_name,
          weight,
          grams,
          bag_id,
          ground_level,
          ground_level_id,
          amount
      })
    },
    /* deletes item with received id from state item list */
    deleteItemFromOrder: (state, item_id) => {
      const index = state.items.map (x => {
        return x.item_id;
      }).indexOf(item_id);
      state.items.splice(index, 1);
    },
    /* deletes all items in state item list */
    deleteAllItemsFromOrder:(state) => {
      state.items.splice(0, state.items.length)
    },
    /* sets amount of item of received id to new amount */
    replaceItemAmount: (state, {item_id, newAmount}) => {
      const item = state.items.find(x => x.item_id == item_id);
      if(item!==undefined){
        item.amount=newAmount;
      }
    },
    resetItemId: (state) => {
      state.itemId=1
    },
    resetOrderType: (state) => {
      state.orderType = ''
    },
    incrementItemId: (state) => {
      state.itemId++
    },
    resetInterval: (state) => {
      state.interval = 0
    },
    resetDayOfWeek: (state) => {
      state.dayOfWeek = 0
    },
    resetInfo: (state) => {
      state.info = ''
    }
  },
  actions: {
    /* add product to order if all attributes are defined */
    addProductToOrder: ({commit}, {item_id, coffee_id, coffee_name, weight, grams, bag_id, ground_level, ground_level_id, amount}) => {
      if(coffee_id!==undefined || coffee_name!== undefined || weight!== undefined || grams!== undefined || ground_level!==undefined || amount!==undefined){
        commit('pushProductToOrder', {item_id, coffee_id, coffee_name, weight, bag_id, grams, ground_level, ground_level_id, amount})
        return true
      }else return false
    },
    changeOrderType: ({commit}, orderType) => {
      commit('setOrderType', orderType)
    },
    resetOrderType: ({commit}) => {
      commit('resetOrderType')
    },
    changeInterval: ({commit}, interval) => {
      commit('setInterval', interval)
    },
    changeDayOfWeek: ({commit}, dayOfWeek) => {
      commit('setDayOfWeek', dayOfWeek)
    },
    changeInfo: ({commit}, info) => {
      commit('setInfo', info)
    },
    removeProductFromOrder: ({commit}, item_id) => {
      commit('deleteItemFromOrder', item_id)
    },
    incrementItemId: ({commit}) => {
      commit('incrementItemId')
    },
    changeItemAmount: ({commit}, {item_id, newAmount}) => {
      commit('replaceItemAmount', {item_id, newAmount})
    },
    chooseDelivery: ({commit}, delivery_id) => {
      commit('setDeliveryId', delivery_id)
    },
    /* sends http request to server to post order */
    postOrder: ({state, dispatch}) => {
      // inserts all items into new array orderItems with a subarray for every item instance
      const orderItems = [] as any
      state.items.map(item => {
        orderItems.push([item.coffee_id, item.bag_id, item.ground_level_id, item.amount])
      })
      return new Promise((resolve, reject) => {
        // if it is a recurring order, send interval and day of week
        if(state.orderType=='recurringOrder'){
          orderService.postOrder(orderItems, state.delivery_id, state.interval, state.dayOfWeek, state.info).then(response => {
            if(typeof response != 'undefined'){
              if(response.status==200){
                dispatch('resetOrderInfo')
              }
            }
            resolve(response)
          }, error => {
            reject(error)
          })
          //else its a one-time order and sends interval and day of week as undefined
        }else{
          orderService.postOrder(orderItems, state.delivery_id, undefined, undefined, state.info).then(response => {
            if(typeof response != 'undefined'){
              if(response.status==200){
                dispatch('resetOrderInfo')
              }
            }
            resolve(response)
          }, error => {
            reject(error)
          })
        }
      })
    },
    /* resets all order state attributes, including order type */
    cancelOrder: ({commit, dispatch}) => {
      dispatch('resetOrderInfo')
      commit('resetOrderType')
    },
    /* resets all order state attributes, excluding order type */
    resetOrderInfo: ({commit}) => {
      commit('deleteAllItemsFromOrder')
      commit('resetItemId')
      commit('resetInterval')
      commit('resetDayOfWeek')
      commit('resetInfo')
    }
  },
  getters: {
    /* calculates total weight of order, used to calcutale post price */
    totalWeightGrams: (state) => {
      let totalWeightGrams = 0
      state.items.map(item => {
        totalWeightGrams += item.grams*item.amount
      })
      return {totalWeightGrams: totalWeightGrams}
    }
  }
}

export default module;