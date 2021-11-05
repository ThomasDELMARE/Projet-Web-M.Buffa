<template>
  <!-- Cette partie nous permet d'afficher le type de cuisine ainsi que le nom du restaurant -->
  <div id="DetailsRestaurant" v-if="dataReady">
    <br />
    <div v-if="dataReady && allowed">
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-30">
          <img width="500" height="600" :src="urlImg" />
        </div>  
        <div class="md-layout-item md-size-40">
          <B><U>
          <h1>{{ this.nom }}</h1>
          </U></B>
          <p class="md-subheadline">Type de cuisine : {{ this.cuisine }}</p>
          <p class="md-subheadline">{{ this.ville }}</p>
        </div>
        <div class="md-layout-item md-size-30">
          <l-map style="height: 300px" :zoom="zoom" :center="center">
            <l-tile-layer :url="url"></l-tile-layer>
            <l-marker :lat-lng="markerLatLng"></l-marker>
          </l-map>
        </div>
      </div>  
      <!-- Ici on appelle le component "Carte Restaurant" afin d'afficher la carte, les menus et la gestion de commande. -->
      <carte-restaurant></carte-restaurant>
    </div>
    <div v-if="dataReady && !allowed">
      <!-- Disconnected Snackbar -->
      <md-snackbar
        :md-position="position"
        :md-duration="duration"
        :md-active.sync="showDisconnectedSnackbar"
        md-persistent
      >
        <span
          >Vous n'êtes pas connecté, veuillez vous connecter afin de pouvoir
          accéder à l'intégralité du site !</span
        >
      </md-snackbar>
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { Icon } from "leaflet";
import CarteRestaurant from "./Menu/CarteRestaurant.vue";

const GoogleImages = require("google-images");
const client = new GoogleImages(
  "bdb3c367ae547443f",
  "AIzaSyATXK5n152fW97tkTSZAIRYT1yIJ2CSk8g"
);

export default {
  name: "DetailsRestaurant",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    CarteRestaurant,
  },
  props: {
    passTest: String,
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
      urlCarte: null,

      // Etat deconnecte de l'utilisateur
      allowed: false,
      showDisconnectedSnackbar: false,
      position: "center",
      duration: 4000,
    };
  },
  methods: {
    affecterValeursRestaurant(r) {
      this.restaurant = r || "Donnée indisponible.";
      this.cuisine = r.cuisine || "Donnée indisponible.";
      this.nom = r.name || "Donnée indisponible.";
      this.ville = r.borough || "Donnée indisponible.";
      this.lat = r.address.coord[1];
      this.long = r.address.coord[0];
      this.urlImg = r.url || null;
    },
    affecterValeursLeaflet() {
      this.center = [this.lat, this.long];
      this.markerLatLng = [this.lat, this.long];
    },
    async fetchRestaurant(id) {
      this.urlCarte = "/details-restaurant/" + id + "/carte";
      let url = "http://localhost:8080/api/restaurants/" + id;
      await fetch(url)
        .then((reponse) => {
          return reponse.json();
        })
        .then((r) => {
          this.affecterValeursRestaurant(r.restaurant);
        });
    },
    afficherImage() {
      let data = new FormData();
      data.append("urlImg", this.urlImg);
      let url = "http://localhost:8080/api/restaurants/" + this.idRestaurant;

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
    async chercherImage() {
      if (this.urlImg === null || this.urlImg === "null") {
        window.setImmediate = window.setTimeout;
        await client.search("restaurant " + this.nom).then((images) => {
          this.urlImg = images[0].url;
        });
        this.afficherImage();
      }
    },
    verifieUtiliserConnecte() {
      if (
        localStorage.getItem("activeUser") == "null" ||
        localStorage.getItem("activeUser") == "" ||
        localStorage.getItem("activeUser") == null
      ) {
        document.location.replace("/connexion");
      }
    },
  },
  async mounted() {
    this.verifieUtiliserConnecte();
    await this.fetchRestaurant(this.idRestaurant);
    this.affecterValeursLeaflet();

    delete Icon.Default.prototype._getIconUrl;
    Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });
    await this.chercherImage();

    if (localStorage.getItem("activeUser") != "null") {
      this.allowed = true;
    } else {
      this.showDisconnectedSnackbar = true;
    }

    this.dataReady = true;
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