import Vue from 'vue'
import VueRouter from '../vueRouter'
import Detail from './../views/Detail.vue'
import Home from './../views/Home.vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '#/home',
    component: Home
  },
  {
    path: '#/detail',
    component: Detail
  },
]
const router = new VueRouter({
  routes
})
export default router