import { Module } from 'vuex/types'
import customerService from '@/api/customer.api'

interface AccountState {
    loggedIn: boolean;
}

const state: AccountState = {
    loggedIn: false
}

const module: Module<AccountState, {}> = {
    namespaced: true,
    state,
    mutations: {
        setLoggedIn(state, loggedInStatus){
            state.loggedIn = loggedInStatus
        }
    },
    actions: {
        login: ({commit}, { username, password }) => {
            return new Promise((resolve, reject) => {
                customerService.login(username, password).then(response => {
                    if(response==200){
                        commit('setLoggedIn', true)
                    }else{
                        commit('setLoggedIn', false)
                    }
                    resolve(response)
                }, error => {
                    reject(error)
                })
            })
        }
    }
}

export default module;