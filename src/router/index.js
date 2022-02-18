import Vue from 'vue'
import Router from 'vue-router'

const  Home = () => import('views/home/Home.vue')
const  CateGroy = () => import('views/catgroy/Categroy.vue')
const  ShopCart = () => import('views/shotcart/Cart.vue')
const  Profile = () => import('views/profile/Profile.vue')

Vue.use(Router)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/categroy',
    component: CateGroy
  },
  {
    path: '/shopcart',
    component: ShopCart
  },
  {
    path: '/profile',
    component: Profile
  }
]

export default new Router({
  routes,
  mode: 'history'
})
