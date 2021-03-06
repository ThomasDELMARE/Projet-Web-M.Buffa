<template>
  <div id="Restaurants">
    <br />

    <h1>Application de gestion de restaurants :</h1>

    <br />

    <!-- Code HTML concernant la recherche des restaurants -->
    <form>
      <label> Rechercher un restaurant : </label>

      <input
        type="text"
        id="restaurantName"
        placeholder="Nom du restaurant"
        @input="getRestaurantByName()"
        @keydown.enter.prevent
      />
    </form>

    <br />

    <button v-if="page !== 0 && restaurants !== 0" @click="pagePrecedente()">
      Précédent
    </button>
    <button v-if="page === 0" disabled>Précédent</button>

    <!-- Nous avons mis un + 1 afin qu'on affiche "page 1" à la place de "page 0" au début -->

    <label> Page {{ page + 1 }} </label>

    <button v-if="page + 1 == nbPagesTotal || restaurants == 0" disabled>
      Suivant
    </button>

    <button
      v-if="page >= 0 && page + 1 != nbPagesTotal && restaurants != 0"
      @click="pageSuivante()"
    >
      Suivant
    </button>

    <br /><br />

    <!-- Cette partie concernera le nombre de restaurants choisis à afficher par l'utilisateur. -->

    <div>
      <input
        type="range"
        id="sliderPage"
        min="0"
        max="100"
        value="10"
        step="5"
        @change="getRestaurantByName()"
      />
      <label for="numPageSlider"
        >{{ sliderValue }} restaurant(s) par page</label
      >
    </div>

    <br />

    <!-- Cette partie nous permettra de voir la liste des restaurants, leurs propriétés ainis que les actions possibles à faire sur ces derniers (suppression/détails). -->

    <md-table v-model="restaurants" md-sort="name" md-sort-order="asc" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Restaurants</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">

        <md-table-cell md-label="Image">
          <img v-if="item.url != null"  width="50" height="50" :src="item.url">
          <img v-if="item.url == null"  width="50" height="50" src="https://cdn.iconscout.com/icon/free/png-256/restaurant-1495593-1267764.png">
        </md-table-cell>
        
        <md-table-cell md-label="Nom" md-sort-by="name">{{
          item.name
        }}</md-table-cell>

        <md-table-cell md-label="Cuisine" md-sort-by="cuisine">{{
          item.cuisine
        }}</md-table-cell>

        <md-table-cell
          md-label="Ville"
          md-sort-by="borough"
          md-selected-value="pas de ville connue"
          >{{ item.borough }}</md-table-cell
        >

        <md-table-cell md-label="Actions">
          <md-button class="md-primary" :to="'/details-restaurant/' + item._id"
            >DETAILS</md-button
          >
          <md-button
            class="md-accent"
            @click="
              confirmPopUp = true;
              setItem(item);
            "
            >SUPPRIMER</md-button
          >
        </md-table-cell>
      </md-table-row>
    </md-table>

    <!-- Pas de résultats snackbar -->
    <md-snackbar
      :md-position="position"
      :md-duration="duration"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>Aucun restaurant ne porte ce nom, réessayez votre recherche !</span>
    </md-snackbar>

    <!-- Buffa snackbar -->
    <md-snackbar
      :md-position="position"
      :md-duration="duration"
      :md-active.sync="showBuffaSnackbar"
      md-persistent
    >
      <span>Bonjour Monsieur !</span>
    </md-snackbar>

    <!-- Obi Wan snackbar -->
    <md-snackbar
      :md-position="position"
      :md-duration="duration"
      :md-active.sync="showObiWanSnackbar"
      md-persistent
    >
      <span>Salut petit scarabé, que la force soit avec toi jeune padawan</span>
    </md-snackbar>

    <!-- Dialogue de confirmation de supression d'un hôtel -->
    <md-dialog-confirm
      :md-active.sync="confirmPopUp"
      md-title="Etes-vous sûr de vouloir supprimer cet hôtel ?"
      md-content="Si vous supprimez un hôtel, il ne sera pas possible d'en récupérer ces données."
      md-confirm-text="Confirmer"
      md-cancel-text="Annuler"
      @md-cancel="onCancel"
      @md-confirm="onConfirm"
    />
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "Restaurants",
  data: () => ({
    restaurants: [],
    nom: "",
    cuisine: "",
    nbRestaurantsTotal: 0,
    page: 0,
    pagesize: 10,
    nbPagesTotal: 0,
    dernierePage: 0,
    sliderValue: 0,

    // Snackbar stuff
    showSnackbar: false,
    showBuffaSnackbar: false,
    showObiWanSnackbar: false,
    showVerification: false,
    position: "center",
    duration: 4000,

    // Deletion button stuff
    confirmPopUp: false,
  }),
  methods: {
    supprimerRestaurant(restaurant) {
      let restaurantASupprimer = restaurant._id;
      let url = "http://localhost:8080/api/restaurants/" + restaurantASupprimer;

      fetch(url, {
        method: "DELETE",
      })
        .then((responseJSON) => {
          responseJSON.json().then((res) => {
            // Maintenant res est un vrai objet JavaScript
            console.log("Restaurant ajouté, " + res.msg);
            // On rafraichit la vue
            this.getRestaurantsFromServer();
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getRestaurantsFromServer() {
      this.sliderValue = document.getElementById("sliderPage").value;
      this.restaurantName = document.getElementById("restaurantName").value;
      this.pagesize = this.sliderValue;

      let url = "http://localhost:8080/api/restaurants?";
      url += "page=" + this.page;
      url += "&pagesize=" + this.sliderValue;

      if (this.restaurantName != null || this.restaurantName != "") {
        url += "&name=" + this.restaurantName;
      }

      fetch(url)
        // On obtient la réponse en JSON
        .then((responseJSON) => {
          // On convertit la réponse JSON qui va la transformer en objet JS
          responseJSON.json().then((res) => {
            // Maintenant res est un vrai objet JavaScript

            // On affiche la snackbar si le résultat est vide
            if (res.count == 0) {
              this.showSnackbar = true;
            }

            if (this.restaurantName == "Obi Wan") {
              this.showObiWanSnackbar = true;
            }

            if (this.restaurantName == "Buffa") {
              this.showBuffaSnackbar = true;
            }

            if (this.sliderValue == 0) {
              this.restaurants = [];
            } else {
              this.restaurants = res.data;
            }

            this.nbRestaurantsTotal = res.count;
            this.nbPagesTotal = Math.round(
              this.nbRestaurantsTotal / this.pagesize
            );
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    pageSuivante() {
      if (this.page + 1 === this.nbPagesTotal) {
        return;
      }
      this.page++;
      this.getRestaurantsFromServer();
    },
    pagePrecedente() {
      if (this.page === 0) {
        return;
      }

      this.page--;
      this.getRestaurantsFromServer();
    },
    getRestaurantByName: _.debounce(function () {
      // Prévoir le fait que l'utilisateur puisse faire une recherche sans revenir à la première page
      this.page = 0;
      this.getRestaurantsFromServer();
    }, 1000),
    onConfirm() {
      this.supprimerRestaurant(this.item);
    },
    onCancel() {
      return;
    },
    setItem(item) {
      this.item = item;
    },
    checkIfUserConnected(){
      if(localStorage.getItem("activeUser") == "null" || localStorage.getItem("activeUser") == "" || localStorage.getItem("activeUser") == null){
      document.location.replace("/connexion");
      }
    }
  },
  mounted() {
    // On regarde si l'utilisateur est connecté, s'il ne l'est pas il sera redirigé sur la page de connexion
    this.checkIfUserConnected();    
    // AVANT RENDU HTML
    this.getRestaurantsFromServer();
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
</style>