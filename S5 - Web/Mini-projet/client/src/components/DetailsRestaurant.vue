<template>
  <div id="DetailsRestaurant" v-if="dataReady">
    <h1>Détails du restaurant {{ this.nom }}</h1>

    <img  width="500" height="600" :src="urlImg">

    <carte-restaurant></carte-restaurant>
        
    <ul>
      <li>Nom : {{ this.nom }}</li>
      <li>Cuisine : {{ this.cuisine }}</li>
      <li>Ville : {{ this.ville }}</li>
    </ul>

    <l-map style="height: 300px"
    :zoom="zoom" 
    :center="center">
      <l-tile-layer :url="url"></l-tile-layer>
      <l-marker :lat-lng="markerLatLng"></l-marker>
    </l-map>


  </div>

</template>

<script>
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { Icon } from "leaflet";
import CarteRestaurant from './Menu/CarteRestaurant.vue'

const GoogleImages = require('google-images');
const client = new GoogleImages('bdb3c367ae547443f', 'AIzaSyATXK5n152fW97tkTSZAIRYT1yIJ2CSk8g');

export default {
  name: "DetailsRestaurant",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    CarteRestaurant
  },
  props: {
    passTest: String
  },
  computed: {
    idRestaurant() {
      return this.$route.params.id;
    },
  },
  data: function () {
    return {
      restaurant: null,
      cuisine: "",
      ville: "",
      nom: "",
      mymap: "",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 5,
      lat: 0,
      long: 0,
      center: undefined,
      markerLatLng: undefined,
      dataReady: false,
      urlImg: null,
      urlCarte: null
    };
  },
  methods: {
    affecterValeursRestaurant(r) {
      this.restaurant = r || "Donnée indisponible.";
      this.cuisine = r.cuisine || "Donnée indisponible.";
      this.nom = r.name || "Donnée indisponible.";
      this.ville = r.borough || "Donnée indisponible.";
      this.lat = r.address.coord[0];
      this.long = r.address.coord[1];
      this.urlImg = r.url || null;
    },
    affecterValeursLeaflet(){
      this.center = [this.lat, this.long];
      this.markerLatLng = [this.lat, this.long];

    },
    async fetchRestaurant(id) {
      this.urlCarte = "/details-restaurant/"+id+"/carte";
      let url = "http://localhost:8080/api/restaurants/" + id;
      await fetch(url)
        .then((reponse) => {
          return reponse.json();
        })
        .then((r) => {
          console.log(r)
          this.affecterValeursRestaurant(r.restaurant);
        });
    },
    putImage(){
      let data = new FormData();
      data.append('urlImg', this.urlImg);
      console.log(data);
      let url = "http://localhost:8080/api/restaurants/"+this.idRestaurant;

      fetch(url, {
        method: "PUT",
        body: data,
      })
        .then((responseJSON) => {
          responseJSON.json().then((res) => {
            console.log("Restaurant édité, " + res.msg);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    searchImage(){
      if(this.urlImg === null || this.urlImg === "null"){
        window.setImmediate = window.setTimeout;
        client.search('restaurant '+ this.nom)
        .then(images => {
          this.urlImg = images[0].url;
        });
        this.putImage();
      }    
    }
  },
  async mounted() {
    await this.fetchRestaurant(this.idRestaurant);
    this.affecterValeursLeaflet();

    delete Icon.Default.prototype._getIconUrl;
    Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });
    await this.searchImage();
    this.dataReady = true ;
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