<template>
  <div id="DetailsRestaurant">
    <h1>Détails du restaurant avec l'id {{ idRestaurant }}</h1>
    <ul>
      <li>Nom : {{ this.nom }}</li>
      <li>Cuisine : {{ this.cuisine }}</li>
      <li>Ville : {{ this.ville }}</li>
      <!-- <li>Coordonnées : {{ this.restaurant.address.coord[0] }}</li> -->
    </ul>

    <l-map style="height: 300px" :zoom="zoom" :center="center">
      <l-tile-layer :url="url"></l-tile-layer>
      <l-marker :lat-lng="markerLatLng"></l-marker>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { Icon } from "leaflet";

export default {
  name: "DetailsRestaurant",
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  props: [
    "restauranto"
  ],
  computed: {
    idRestaurant() {
      return this.$route.params.id;
    }
  },
  data: function () {
    return {
      restaurant: null,
      cuisine: "",
      ville: "",
      nom: "",
      mymap: "",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 15,
      // center: [this.restaurant.address.coord[0], this.restaurant.address.coord[1]],
      center: [50, 50],
      markerLatLng: [51.504, -0.159],
      // markerLatLng: [51.504, -0.159],
    };
  },
  methods: {
    affecterValeursRestaurant(r) {
      this.restaurant = r || "Donnée indisponible.";
      this.restaurant = this.restauranto || "Donnée indisponible.";
      this.cuisine = r.cuisine || "Donnée indisponible.";
      this.nom = r.name || "Donnée indisponible.";
      this.ville = r.borough || "Donnée indisponible.";
      // SOLUTION EST LA, FAUT TRAVAILLER DESSUS MTNT
      this.mymap.panTo([r.address.coord[0], r.address.coord[1]]);
    },
    fetchRestaurant(id) {
      // console.log("Fetch de l'id en cours...");
      let url = "http://localhost:8080/api/restaurants/" + id;
      fetch(url)
        .then((reponse) => {
          return reponse.json();
        })
        .then((r) => {
          this.affecterValeursRestaurant(r.restaurant);
        });
    },
  },
  mounted() {
    this.fetchRestaurant(this.idRestaurant);

    delete Icon.Default.prototype._getIconUrl;
    Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.tab {
  text-align: center;
  color: #42b983;
}
#mapid {
  height: 180px;
}
</style>