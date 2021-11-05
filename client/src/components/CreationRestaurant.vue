<template>
  <div>
    <br />

    <!-- Ce component sert à afficher la page de création des restaurants. On peut créer plus facilement un restaurant avec la librairie Algolia. -->

    <h1>Création d'un nouveau restaurant</h1>

    <form v-on:submit="ajouterRestaurant" style="width: 1200px; margin: auto">
      <md-field>
        <label>Entrer un nom</label>
        <md-input name="nom" type="text" required v-model="nom"></md-input>
      </md-field>

      <md-field id="cuisine">
        <label>Entrer la cuisine</label>
        <md-input
          name="cuisine"
          type="text"
          required
          v-model="cuisine"
        ></md-input>
      </md-field>

      <md-field>
        <label>Entrer un adresse</label>
        <md-input
          name="adresse"
          type="text"
          required
          v-model="adresse"
        ></md-input>
      </md-field>

      <md-field>
        <label>Entrer une ville</label>
        <md-input name="city" type="text" required v-model="city"></md-input>
      </md-field>

      <md-field>
        <label>Entrer un zipcode</label>
        <md-input
          name="zipcode"
          type="text"
          required
          v-model="zipcode"
        ></md-input>
      </md-field>

      <md-field>
        <label>Entrer un pays</label>
        <md-input
          name="country"
          type="text"
          required
          v-model="country"
        ></md-input>
      </md-field>

      <button class="md-button md-raised">Ajouter</button>
    </form>

    <!-- Ajout restaurant réussi snackbar -->
    <md-snackbar
      :md-position="position"
      :md-duration="duration"
      :md-active.sync="ajoutRestaurantSnackbar"
      md-persistent
    >
      <span>Le restaurant a bien été ajouté !</span>
    </md-snackbar>
  </div>
</template>

<script>
import places from "places.js";

export default {
  name: "CreationRestaurant",
  data: () => ({
    nom: "",
    cuisine: "",
    adresse: "",
    zipcode: "",
    city: "",
    country: "",
    lat: "",
    lng: "",

    // Snackbar stuff
    ajoutRestaurantSnackbar: false,
    position: "center",
    duration: 4000,

    //Algolia Places
    instance: null,
  }),
  methods: {
    async ajouterRestaurant(event) {
      // eviter le comportement par defaut
      event.preventDefault();

      let form = event.target;
      let donneesFormulaire = new FormData(form);
      donneesFormulaire.append("lat", this.lat);
      donneesFormulaire.append("lng", this.lng);
      let url = "http://localhost:8080/api/restaurants";

      fetch(url, {
        method: "POST",
        body: donneesFormulaire,
      })
        .then((responseJSON) => {
          responseJSON.json().then(() => {
            // Maintenant res est un vrai objet JavaScript
            this.ajoutRestaurantSnackbar = true;
          });
        })
        .catch((err) => {
          console.log(err);
        });

      this.nom = "";
      this.cuisine = "";
      this.adresse = "";
      this.zipcode = "";
      this.city = "";
      this.country = "";
      this.lat = "";
      this.lng = "";
    },
    verifieUtilisateurConnecte() {
      if (
        localStorage.getItem("activeUser") == "null" ||
        localStorage.getItem("activeUser") == "" ||
        localStorage.getItem("activeUser") == null
      ) {
        document.location.replace("/connexion");
      }
    },
  },
  mounted() {
    this.verifieUtilisateurConnecte();    
    this.input = document.createElement("input");
    var restaurantId = document.getElementById('cuisine');
    restaurantId.insertAdjacentElement('afterend', this.input);

    this.instance = places({
      container: this.input,
    });

    this.instance.on("change", (e) => {
      this.$emit("change", e);
      this.adresse = e.suggestion.name;
      this.zipcode = e.suggestion.postcode;
      this.city = e.suggestion.city;
      this.country = e.suggestion.country;
      this.lat = e.suggestion.latlng.lat;
      this.lng = e.suggestion.latlng.lng;
    });
  },
  beforeDestroy() {
    // On réinitialise/détruit l'instance initialisée
    this.instance.off();
    this.instance.destroy();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
