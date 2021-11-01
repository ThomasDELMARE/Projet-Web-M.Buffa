import App from './App.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

import Restaurants from './components/Restaurants.vue'
import DetailsRestaurant from './components/DetailsRestaurant.vue'
import CreationRestaurant from './components/CreationRestaurant.vue'
import CarteRestaurant from './components/Menu/CarteRestaurant.vue'

Vue.use(VueRouter);
Vue.use(VueMaterial);

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

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
      },
      {
        path: "/creation-restaurant",
        component: CreationRestaurant,
      },
      {
        path: "/carte-restaurant",
        component: CarteRestaurant,
      }
    ],
    mode:'history'
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
