<template>
  <div id="CarteRestaurant" v-if="dataReady">
    <p>
      <B><U> Menu du midi : </U></B><br /> <br />
      {{ this.menu.entree.nom }} <br />
      {{ this.menu.plat.nom }}<br />
      {{ this.menu.dessert.nom }}
    </p>
    <p>
      <B><U> Menu gastronomique : </U></B><br /> <br />
      {{ this.menuGastronomique.entree.nom }} <br />
      {{ this.menuGastronomique.plat.nom }}<br />
      {{ this.menuGastronomique.dessert.nom }}
    </p>
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
        let idEntree = Math.round(
          Math.random() * this.listeEntreesGastronomique.length
        );
        let idPlat = Math.round(
          Math.random() * this.listePlatsGastronomique.length
        );
        let idDessert = Math.round(
          Math.random() * this.listeDessertsGastronomique.length
        );

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
        let idEntree = Math.round(Math.random() * this.listeEntrees.length);
        let idPlat = Math.round(Math.random() * this.listePlats.length);
        let idDessert = Math.round(Math.random() * this.listeDesserts.length);

        this.entree = this.listeEntrees[idEntree];
        this.plat = this.listePlats[idPlat];
        this.dessert = this.listeDesserts[idDessert];

        this.menu = {
          entree: this.entree,
          plat: this.plat,
          dessert: this.dessert,
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
