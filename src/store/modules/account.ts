import { Module } from 'vuex/types'
import httpClient from '@/api/httpClient'

interface AccountState {
    token: '',
    user: {
        customer_id: number,
        name: String,
        address: String,
        phone: number,
        org_number: number,
        email: String,
        active: number,
        subscription: number,
        zip_code: number,
        ref_id: number,
        last_login: number
    }
}

const state: AccountState = {
    token: '',
    user: {
        customer_id: -1,
        name: '',
        address: '',
        phone: -1,
        org_number: -1,
        email: '',
        active: -1,
        subscription: -1,
        zip_code: -1,
        ref_id: -1,
        last_login: -1
    }
}

const module: Module<AccountState, {}> = {
    namespaced: true,
    state,
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_USER: (state, user) => {
            state.user = user
        },
        SET_USER_INFO: (state, userInfo) => {
            state.user.name = userInfo.name
            state.user.address = userInfo.address
            state.user.phone = userInfo.phone
            state.user.org_number = userInfo.org_number
            state.user.email = userInfo.email
            state.user.subscription = parseInt(userInfo.subscription)
            state.user.zip_code = userInfo.zip_code
        },
        RESET: state => {
            state.token = '',
            state.user = {
                customer_id: -1,
                name: '',
                address: '',
                phone: -1,
                org_number: -1,
                email: '',
                active: -1,
                subscription: -1,
                zip_code: -1,
                ref_id: -1,
                last_login: -1
            }
        }
    },
    actions: {
        login: ({ commit }, { token, user }) => {
            commit('SET_TOKEN', token)
            commit('SET_USER', user)
            // set auth header
            httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
        },
        logout: ({ commit }) => {
            console.log('logging out')
            commit('RESET')
            commit('order/deleteAllItemsFromOrder', null, { root: true })
            commit('order/resetItemId', null, { root: true })
            commit('order/resetOrderType', null, { root: true })
        },
        updateUser: ({ commit }, userinfo) => {
            console.log('updating user state')
            commit('SET_USER', userinfo)
        }
    },
    getters: {
        isLoggedIn: state => {
            return state.token
        },
        getUser: state => {
            return state.user
        }
    }
}

export default module;