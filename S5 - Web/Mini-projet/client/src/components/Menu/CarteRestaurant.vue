<template>
  <div id="CarteRestaurant" v-if="dataReady" style="float:center" >
  <md-button class="md-primary" @click="printCommande()"><img src="https://img.icons8.com/material-outlined/24/000000/shopping-cart--v1.png"/></md-button>

  <md-dialog :md-active.sync="showCommande">
    <md-dialog-title>Commande</md-dialog-title>

    <md-table id="tableEntree" v-model="commande" md-card>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Img"><img width="50" height="50" :src="item.lien"></md-table-cell>
        <md-table-cell md-label="Nom">{{item.nom}}</md-table-cell>
        <md-table-cell md-label="Prix">{{item.prix}} €</md-table-cell>
      </md-table-row>
    </md-table>
    <md-dialog-actions>
      <md-button class="md-primary" @click="showCommande = false">Close</md-button>
      <md-button class="md-primary" @click="showCommande = false">Save</md-button>
    </md-dialog-actions>
  </md-dialog>

    <p style="float: left;">
      <B><U> Menu du midi : </U></B><br />
      <br />
      {{ this.menu.entree.nom }} : {{ this.menu.entree.prix }} € <br /> <br /> <img width="200" height="250" :src="this.menu.entree.lien"> <br /> <br /> 
      {{ this.menu.plat.nom }} : {{ this.menu.plat.prix }} € <br /> <br />  <img width="200" height="250" :src="this.menu.plat.lien"> <br /> <br /> 
      {{ this.menu.dessert.nom }} : {{ this.menu.dessert.prix }} € <br /> <br />  <img width="200" height="250" :src="this.menu.dessert.lien"> <br /> <br /> 
    </p>
    <p style="float: center;">
      <B><U> Menu gastronomique : </U></B><br />
      <br />
      {{ this.menuGastronomique.entree.nom }} :
      {{ this.menuGastronomique.entree.prix }} € <br /> <br />  <img width="200" height="250" :src="this.menuGastronomique.entree.lien"><br /> <br /> 
      {{ this.menuGastronomique.plat.nom }} :
      {{ this.menuGastronomique.plat.prix }} € <br /> <br />  <img width="200" height="250" :src="this.menuGastronomique.plat.lien"><br /><br />
      {{ this.menuGastronomique.dessert.nom }} :
      {{ this.menuGastronomique.dessert.prix }} € <br /> <br />  <img width="200" height="250" :src="this.menuGastronomique.dessert.lien"><br /><br />
    </p> <br />

    <md-table id="tableEntree" style="width:1500px; display:inline-block" v-model="carteEntree" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Carte des entrées</h1>
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Img"><img width="50" height="50" :src="item.lien"></md-table-cell>
        <md-table-cell md-label="Nom">{{item.nom}}</md-table-cell>
        <md-table-cell md-label="Prix">{{item.prix}} €</md-table-cell>
        <md-table-cell md-label="Ajouter au panier">
          <md-button class="md-primary" @click="addProduitToCommande(item)"><img src="https://img.icons8.com/material-outlined/24/000000/plus--v1.png"/></md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>

    <md-table id="tablePlat" style="width:1500px; display:inline-block" v-model="cartePlat" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Carte des plats</h1>
      </md-table-toolbar>
      <md-table-row  slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Img"><img width="50" height="50" :src="item.lien"></md-table-cell>
        <md-table-cell md-label="Nom">{{item.nom}}</md-table-cell>
        <md-table-cell md-label="Prix">{{item.prix}} €</md-table-cell>
        <md-table-cell md-label="Ajouter au panier">
          <md-button class="md-primary" @click="addProduitToCommande(item)"><img src="https://img.icons8.com/material-outlined/24/000000/plus--v1.png"/></md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>

    <md-table id="tableDessert" style="width:1500px; display:inline-block; margin-left : 200px" class="md-alignment-center" v-model="carteDessert" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Carte des desserts</h1>
      </md-table-toolbar>
      <md-table-row  slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Img"><img width="50" height="50" :src="item.lien"></md-table-cell>
        <md-table-cell md-label="Nom">{{item.nom}}</md-table-cell>
        <md-table-cell md-label="Prix">{{item.prix}} €</md-table-cell>
        <md-table-cell md-label="Ajouter au panier">
          <md-button class="md-primary" @click="addProduitToCommande(item)"><img src="https://img.icons8.com/material-outlined/24/000000/plus--v1.png"/></md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import data from "/src/assets/json/produits.json";

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
    listeEntreesStandards: [],
    listePlats: [],
    listePlatsGastronomique: [],
    listePlatsStandards: [],
    listeDesserts: [],
    listeDessertsGastronomique: [],
    listeDessertsStandards: [],

    entree: null,
    plat: null,
    dessert: null,
    entreeGastronomique: null,
    platGastronomique: null,
    dessertGastronomique: null,

    menu: null,
    menuGastronomique: null,
    carteEntree: [],
    cartePlat: [],
    carteDessert: [],

    commande:[],

    showCommande: false,
    dataReady: false,
  }),
  methods: {
    computeAllProducts() {
      this.produits.forEach((p) => {
        if (p.type === "plat" && p.gastronomique == true) {
          this.listePlatsGastronomique.push(p);
          this.listePlats.push(p);
        } else if (p.type === "dessert" && p.gastronomique == true) {
          this.listeDessertsGastronomique.push(p);
          this.listeDesserts.push(p);
        } else if (p.type === "entree" && p.gastronomique == true) {
          this.listeEntreesGastronomique.push(p);
          this.listeEntrees.push(p);
        } else if (p.type === "plat" && p.gastronomique == false) {
          this.listePlatsStandards.push(p);
          this.listePlats.push(p);
        } else if (p.type === "dessert" && p.gastronomique == false) {
          this.listeDessertsStandards.push(p);
          this.listeDesserts.push(p);
        } else if (p.type === "entree" && p.gastronomique == false) {
          this.listeEntreesStandards.push(p);
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

        this.entreeGastronomique = this.listeEntreesGastronomique[idEntree];
        this.platGastronomique = this.listePlatsGastronomique[idPlat];
        this.dessertGastronomique = this.listeDessertsGastronomique[idDessert];

        this.menuGastronomique = {
          entree: this.entreeGastronomique,
          plat: this.platGastronomique,
          dessert: this.dessertGastronomique,
        };

      } else {
        let idEntree = parseInt(Math.random() * this.listeEntreesStandards.length);
        let idPlat = parseInt(Math.random() * this.listePlatsStandards.length);
        let idDessert = parseInt(Math.random() * this.listeDessertsStandards.length);

        this.entree = this.listeEntreesStandards[idEntree];
        this.plat = this.listePlatsStandards[idPlat];
        this.dessert = this.listeDessertsStandards[idDessert];

        this.menu = {
          entree: this.entree,
          plat: this.plat,
          dessert: this.dessert,
        };
      }
    },
    createCarte(){
      this.createCarteEntree();
      this.createCartePlat();
      this.createCarteDessert();
    },
    createCarteEntree(){
      let ids = [];
      let id;
      for(let i = 0; i < 3; i++){
        id = parseInt(Math.random() * this.listeEntrees.length);
        ids.push(id);
      }
      while(ids[0] === ids[1] || ids[0] === ids[2] || ids[1] === ids[2]){
        ids = [];
        for(let i = 0; i < 3; i++){
          id = parseInt(Math.random() * this.listeEntrees.length);
          ids.push(id);
        }
      }
      ids.forEach((id) => {
        this.carteEntree.push(this.listeEntrees[id]);
      });
      console.log(this.carteEntree);
    },
    createCartePlat(){
      let ids = [];
      let id;
      for(let i = 0; i < 3; i++){
        id = parseInt(Math.random() * this.listePlats.length);
        ids.push(id);
      }
      while(ids[0] === ids[1] || ids[0] === ids[2] || ids[1] === ids[2]){
        ids = [];
        for(let i = 0; i < 3; i++){
          id = parseInt(Math.random() * this.listePlats.length);
          ids.push(id);
        }
      }
      ids.forEach((id) => {
        this.cartePlat.push(this.listePlats[id]);
      });
      console.log(this.cartePlat);
    },
    createCarteDessert(){
      let ids = [];
      let id;
      for(let i = 0; i < 3; i++){
        id = parseInt(Math.random() * this.listeDesserts.length);
        ids.push(id);
      }
      while(ids[0] === ids[1] || ids[0] === ids[2] || ids[1] === ids[2]){
        ids = [];
        for(let i = 0; i < 3; i++){
          id = parseInt(Math.random() * this.listeDesserts.length);
          ids.push(id);
        }
      }
      ids.forEach((id) => {
        this.carteDessert.push(this.listeDesserts[id]);
      });
      console.log(this.carteDessert);
    },
    printCommande(){
      console.log(this.commande);
      this.showCommande = true;
    },
    addProduitToCommande(item){
      this.commande.push(item);
    }
  },
  mounted() {
    this.produits = data.listeProduits;
    this.computeAllProducts();
    this.createMenu(false);
    this.createMenu(true);
    this.createCarte();
    this.dataReady = true;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
