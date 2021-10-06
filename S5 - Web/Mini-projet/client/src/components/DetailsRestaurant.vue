<template>
  <div id="DetailsRestaurant">
    <h1>Détails du restaurant avec l'id {{ idRestaurant }}</h1>
    <ul>
      <li>Nom : {{ this.nom }}</li>
      <li>Cuisine : {{ this.cuisine }}</li>
      <li>Ville : {{ this.ville }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "DetailsRestaurant",
  props: {},
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
    };
  },
  methods: {
    affecterValeursRestaurant(r) {
      this.restaurant = r || "Donnée indisponible.";
      this.cuisine = r.cuisine || "Donnée indisponible.";
      this.nom = r.name || "Donnée indisponible.";
      this.ville = r.borough || "Donnée indisponible.";
    },
    fetchRestaurant(id) {
      // console.log("Fetch de l'id en cours...");
      let url = "http://localhost:8080/api/restaurants/" + id;
      fetch(url)
        .then((reponse) => {
          return reponse.json();
        })
        .then((r) => {
          // console.log(r.restaurant.name)
          this.affecterValeursRestaurant(r.restaurant);
        });
    },
  },
  mounted() {
    this.fetchRestaurant(this.idRestaurant);
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