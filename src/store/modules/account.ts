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
    },
    loggedIn: boolean
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
    },
    loggedIn: false
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
        SET_LOGGEDIN: (state, bool) => {
            state.loggedIn = bool
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
        /* resets all state attributes */
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
            },
            state.loggedIn = false
        }
    },
    actions: {
        /* sets all attributes in account state, and auth http header with valid token */
        login: ({ commit }, { token, user }) => {
            commit('SET_TOKEN', token)
            commit('SET_USER', user)
            commit('SET_LOGGEDIN', true)
            httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
        },
        /* resets user state, order state and sets logged in to false */
        logout: ({ commit, dispatch }) => {
            commit('SET_LOGGEDIN', false)
            commit('RESET')
            dispatch('order/resetOrderInfo', null, { root: true })
            commit('order/resetOrderType', null, { root: true })
        },
        /* sets user state to updated user info */
        updateUser: ({ commit }, userinfo) => {
            commit('SET_USER', userinfo)
        }
    },
    getters: {
        /* returns state token */
        isLoggedIn: state => {
            return state.token
        },
        /* return state user */
        getUser: state => {
            return state.user
        }
    }
}

export default module;