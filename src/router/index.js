import Vue from 'vue'
import VueRouter from 'vue-router' 
import Home from '../views/Home.vue'
import Ticket from '../views/Ticket.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/ticket',
    name: 'Ticket',
    component: Ticket,
  },
  { path: '*', redirect: '/home' }
]

const router = new VueRouter({
  mode: 'history',
  routes
})
export default router