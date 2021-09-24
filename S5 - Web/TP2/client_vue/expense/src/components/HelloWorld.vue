<template>
  <div id="HelloWorld">
    <form v-on:submit="ajouterRestaurant">
      <label> Nom : <input type="text" required v-model="nom" /> </label>
      <label>
        Cuisine : <input type="text" required v-model="cuisine" />
      </label>

      <button>Ajouter</button>
    </form>

    <h1>Nombre de restaurants : {{ nbRestaurantsTotal }}</h1>
    <p>Nb pages totales : {{ nbPagesTotal }}</p>

    <button v-if="page !== 0 && restaurants !== 0" @click="pagePrecedente()">
      Précédent
    </button>
    <button v-if="page === 0 || restaurants == 0" disabled>Précédent</button>

    <button
      v-if="page >= 0 && page != nbPagesTotal && restaurants != 0"
      @click="pageSuivante()"
    >
      Suivant
    </button>
    <button v-if="page === nbPagesTotal || restaurants == 0" disabled>
      Suivant
    </button>

    <br /><br />

    <div>
      <input
        type="range"
        id="sliderPage"
        min="0"
        max="100"
        value="0"
        step="5"
        @change="getRestaurantsFromServer()"
      />
      <label for="numPageSlider"
        >{{ sliderValue }} restaurant(s) par page</label
      >
    </div>

    <br />

    <input
      type="text"
      placeholder="Nom du restaurant"
      @input="getRestaurantByName()"
    />

    <br /><br />

    <table>
      <tr>
        <th>Nom</th>
        <th>Cuisine</th>
      </tr>
      <tbody>
        <tr
          v-for="(r, index) in restaurants"
          v-on:click="supprimerRestaurant(index)"
          v-bind:key="r"
          v-bind:style="{ backgroundColor: getColor(index) }"
        >
          <td>{{ r.name }}</td>
          <td>{{ r.cuisine }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// import _ from "lodash";

export default {
  name: "HelloWorld",
  el: "#app",
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
  }),
  methods: {
    supprimerRestaurant(index) {
      this.restaurants.splice(index, 1);
    },
    ajouterRestaurant(event) {
      // eviter le comportement par defaut
      event.preventDefault();

      this.restaurants.push({
        nom: this.nom,
        cuisine: this.cuisine,
      });
      this.nom = "";
      this.cuisine = "";
    },
    getColor(index) {
      return index % 2 ? "lightBlue" : "pink";
    },
    getRestaurantsFromServer() {
      this.sliderValue = document.getElementById("sliderPage").value;

      let url = "http://localhost:8080/api/restaurants?";
      url += "page=" + this.page;
      url += "&pagesize=" + this.sliderValue;

      fetch(url)
        // On obtient la réponse en JSON
        .then((responseJSON) => {
          // On convertit la réponse JSON qui va la transformer en objet JS
          responseJSON.json().then((res) => {
            // Maintenant res est un vrai objet JavaScript
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
      if (this.page === this.nbPagesTotal) {
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
    getRestaurantByName() {},
  },
  mounted() {
    console.log("AVANT RENDU HTML");
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
</style>