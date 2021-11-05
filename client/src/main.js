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
import Connexion from './components/Connexion.vue'
import HistoriqueCommande from './components/HistoriqueCommande.vue'

Vue.use(VueRouter);
Vue.use(VueMaterial);

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

Vue.config.productionTip = false

// On définit des routes afin de pouvoir se déplacer entre les différentes vues du projet
const router = new VueRouter({
  routes:
    [
      {
        path: "/",
        component: Restaurants
      },
      {
        path: "/connexion",
        component: Connexion
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
        path: "/details-restaurant/:id/carte",
        component: CarteRestaurant,
      },
      {
        path: "/historique-commandes",
        component: HistoriqueCommande,
      }
    ],
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  // QUAND L UTILISATEUR VEUT SE DECONNECTER
  if (to.path == "/connexion") {
    if (localStorage.getItem("activeUser") != "null") {
      if (from.fullPath.includes("/details-restaurant") || from.fullPath == "/" || from.fullPath == "/creation-restaurant") {
        next(localStorage.setItem("activeUser", "null"));
        next(router.go("/connexion"));
        this.location.reload()
      }
    }
  }
  next()
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
