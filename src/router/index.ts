import Vue from 'vue'
import VueRouter from 'vue-router'
import OrderOverview from '../views/OrderOverview.vue'
import NewOrder from '../views/NewOrder.vue'
import MyProfile from '../views/MyProfile.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/order-overview',
    name: 'OrderOverview',
    component: OrderOverview
  },
  {
    path: '/new-order',
    name: 'NewOrder',
    component: NewOrder
  },
  {
    path: '/my-profile',
    name: 'MyProfile',
    component: MyProfile
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register-new-user',
    name: 'registerNewUser',
    component: Register
  },
  {
    path: '*',
    name: 'notFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
