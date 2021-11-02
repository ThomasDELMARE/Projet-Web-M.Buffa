<template>
  <div id="CarteRestaurant" v-if="dataReady">
    <p>
      <B><U> Menu du midi : </U></B><br />
      <br />
      {{ this.menu.entree.nom }} : {{ this.menu.entree.prix }} €<br />
      {{ this.menu.plat.nom }} : {{ this.menu.plat.prix }} €<br />
      {{ this.menu.dessert.nom }} : {{ this.menu.dessert.prix }} € <img width="400" height="500" v-bind:src="this.menu.dessert.lien">
    </p>
    <p>
      <B><U> Menu gastronomique : </U></B><br />
      <br />
      {{ this.menuGastronomique.entree.nom }} :
      {{ this.menuGastronomique.entree.prix }} €<br />
      {{ this.menuGastronomique.plat.nom }} :
      {{ this.menuGastronomique.plat.prix }} €<br />
      {{ this.menuGastronomique.dessert.nom }} :
      {{ this.menuGastronomique.dessert.prix }} € <br />
    </p> <br />

  </div>
</template>

<script>
import data from "../../assets/json/produits.json";

export default {
  name: "CarteRestaurant",
  computed: {
    idRestaurant() {
      return this.$route.params.id;
    },
  },
  data: () => ({
    produits: null,

    listeEntrees: [],
    listeEntreesGastronomique: [],
    listePlats: [],
    listePlatsGastronomique: [],
    listeDesserts: [],
    listeDessertsGastronomique: [],

    entree: null,
    plat: null,
    dessert: null,
    entreeGastronomique: null,
    platGastronomique: null,
    dessertGastronomique: null,

    menu: null,
    menuGastronomique: null,
    dataReady: false,
  }),
  methods: {
    computeAllProducts() {
      this.produits.forEach((p) => {
        if (p.type === "plat" && p.gastronomique == true) {
          this.listePlatsGastronomique.push(p);
        } else if (p.type === "dessert" && p.gastronomique == true) {
          this.listeDessertsGastronomique.push(p);
        } else if (p.type === "entree" && p.gastronomique == true) {
          this.listeEntreesGastronomique.push(p);
        } else if (p.type === "plat" && p.gastronomique == false) {
          this.listePlats.push(p);
        } else if (p.type === "dessert" && p.gastronomique == false) {
          this.listeDesserts.push(p);
        } else if (p.type === "entree" && p.gastronomique == false) {
          this.listeEntrees.push(p);
        }
      });
    },
    createMenu(gastronomique) {
      if (gastronomique == true) {
        let idEntree = parseInt(
          Math.random() * this.listeEntreesGastronomique.length
        );
        let idPlat = parseInt(
          Math.random() * this.listePlatsGastronomique.length
        );
        let idDessert = parseInt(
          Math.random() * this.listeDessertsGastronomique.length
        );

        console.log(idEntree);
        console.log(idPlat);
        console.log(idDessert);

        this.entreeGastronomique = this.listeEntreesGastronomique[idEntree];
        this.platGastronomique = this.listePlatsGastronomique[idPlat];
        this.dessertGastronomique = this.listeDessertsGastronomique[idDessert];

        console.log("Plat gastro : ", this.platGastronomique);
        console.log("Entree gastro : ", this.entreeGastronomique);
        console.log("Dessert gastro : ", this.dessertGastronomique);

        this.menuGastronomique = {
          entree: this.entreeGastronomique,
          plat: this.platGastronomique,
          dessert: this.dessertGastronomique,
        };

        console.log(this.menu);
      } else {
        let idEntree = parseInt(Math.random() * this.listeEntrees.length);
        let idPlat = parseInt(Math.random() * this.listePlats.length);
        let idDessert = parseInt(Math.random() * this.listeDesserts.length);

        this.entree = this.listeEntrees[idEntree];
        this.plat = this.listePlats[idPlat];
        this.dessert = this.listeDesserts[idDessert];

        this.menu = {
          entree: this.entree,
          plat: this.plat,
          dessert: this.dessert,
          imageEntree: this.entree.lien
        };
      }
    },
  },
  mounted() {
    this.produits = data.listeProduits;
    this.computeAllProducts();
    this.createMenu(false);
    this.createMenu(true);
    this.dataReady = true;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
