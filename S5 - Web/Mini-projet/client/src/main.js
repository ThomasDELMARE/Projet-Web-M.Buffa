import App from './App.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import Restaurants from './components/Restaurants.vue'
import DetailsRestaurant from './components/DetailsRestaurant.vue'

Vue.use(VueRouter)
Vue.use(VueMaterial)

Vue.config.productionTip = false

// On définit des routes
const router = new VueRouter({
  routes:
    [
      {
        path: "/",
        component: Restaurants
      },
      {
        path: "/details-restaurant/:id",
        component: DetailsRestaurant,
        props: {
        }
      }
    ],
    mode:'history'
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
