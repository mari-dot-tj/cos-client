import Vue from 'vue'
import VueRouter from 'vue-router'
import OrderOverview from '../views/OrderOverview.vue'
import NewOrder from '../views/NewOrder.vue'
import MyProfile from '../views/MyProfile.vue'
import LoginForm from '../views/LoginForm.vue'
import RegisterForm from '../views/RegisterForm.vue'

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
    component: LoginForm
  },
  {
    path: '/register-new-user',
    name: 'registerNewUser',
    component: RegisterForm
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
