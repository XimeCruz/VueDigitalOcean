import Vue from 'vue'
import VueRouter from 'vue-router' 
import Home from '../views/Home.vue'
import Ticket from '../views/Ticket.vue'
import Prices from '../views/Prices.vue'
import ChooseSeats from '../views/ChooseSeats.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/ticket/:id',
    name: 'Ticket',
    component: Ticket,
    props: true 
  },
  {
    path: '/enviar_tooltips_mapa/:id',
    name: 'Prices',
    component: Prices,
    props: true 
  },
  {
    path: '/choose',
    name: 'Choose',
    component: ChooseSeats,
    props: true 
  },
  { path: '*', redirect: '/home' }
]

const router = new VueRouter({
  mode: 'history',
  routes
})
export default router