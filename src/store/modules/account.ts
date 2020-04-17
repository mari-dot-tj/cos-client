import { Module } from 'vuex/types'
import httpClient from '@/api/httpClient'

interface AccountState {
    token: '',
    user: {}
}

const state: AccountState = {
    token: '',
    user: {}
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
        RESET: state => {
            state.token = '',
            state.user = {}
        }
    },
    actions: {
        login: ({ commit, state }, { token, user }) => {
            commit('SET_TOKEN', token)
            commit('SET_USER', user)
            // set auth header
            httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
        },
        logout: ({ commit }) => {
            console.log('logging out')
            commit('RESET')
            commit('order/deleteAllItemsFromOrder', null, { root: true })
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