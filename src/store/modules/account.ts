import { Module } from 'vuex/types'
import customerService from '@/api/customer.api'
import placeService from '@/api/place.api'

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
        },
        register: ({commit}, {name, address, phone, org_number, email, zip_code, subscription}) => {
            return new Promise((resolve, reject) => {
                customerService.register({name, address, phone, org_number, email, zip_code, subscription}).then(response => {
                    resolve(response)
                }, error => {
                    reject(error)
                })
            })
        },
        getProvinceByZip: ({commit}, zip) =>{
            return new Promise((resolve, reject) => {
                placeService.getProvinceByZip(zip).then(response => {
                    resolve(response)
                }, error => {
                    reject(error)
                })
            })
        }
    }
}

export default module;