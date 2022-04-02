import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from "@/components/common/toast"
import fastClick from 'fastclick'
import vueLazyload from 'vue-lazyload'

Vue.config.productionTip = false

// 再Vue实例的原型中添加$bus，来应用事件总线
Vue.prototype.$bus = new Vue()

// 安装toast组件
Vue.use(toast)

// 解决移动端300毫秒的问题
fastClick.attach(document.body)

// 安装懒加载的插件
Vue.use(vueLazyload, {
  loading: require('./assets/img/common/placeholder.png')
})
// swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
