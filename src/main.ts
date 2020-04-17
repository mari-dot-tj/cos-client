import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import httpClient from '@/api/httpClient'

Vue.config.productionTip = false

httpClient.defaults.headers.common['Authorization'] = `Bearer ${store.state.account.token}`

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
