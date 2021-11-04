<template>
  <div id="CarteRestaurant" v-if="dataReady">
  <md-button class="md-primary" @click="printCommande()"><img src="https://img.icons8.com/material-outlined/24/000000/shopping-cart--v1.png"/></md-button>

  <md-dialog :md-active.sync="showCommande">
    <md-dialog-title>Commande</md-dialog-title>

    <md-table  v-model="commande"  md-card>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Img"><img width="50" height="50" :src="item.lien"></md-table-cell>
        <md-table-cell md-label="Nom">{{item.nom}}</md-table-cell>
        <md-table-cell md-label="Prix">{{item.prix}} €</md-table-cell>
        <md-table-cell md-label="Nombre">{{item.nombre}}</md-table-cell>
        <md-table-cell md-label="Enlever un produit">
          <md-button class="md-primary" @click="minusProduitToCommande(item)"><img src="https://img.icons8.com/windows/32/000000/minus.png"/></md-button>
        </md-table-cell>
      </md-table-row>

    </md-table>
    <md-dialog-actions>
      <p>Total : {{totalCommande}} €</p> <br>
      <md-button class="md-primary" @click="showCommande = false">Close</md-button>
      <md-button class="md-primary" @click="showCommande = false">Save</md-button>
    </md-dialog-actions>
  </md-dialog>


  <div class="md-layout md-gutter">
    <div class="md-layout-item md-size-20">
      <B><U> Menu du midi : {{menu.prix}} €</U></B><br />
      <br />
      {{ this.menu.entree.nom }} : {{ this.menu.entree.prix }} € <br /> <br /> <img width="200" height="250" :src="this.menu.entree.lien"> <br /> <br /> 
      {{ this.menu.plat.nom }} : {{ this.menu.plat.prix }} € <br /> <br />  <img width="200" height="250" :src="this.menu.plat.lien"> <br /> <br /> 
      {{ this.menu.dessert.nom }} : {{ this.menu.dessert.prix }} € <br /> <br />  <img width="200" height="250" :src="this.menu.dessert.lien"> <br /> <br /> 
    </div>

    <div class="md-layout-item md-size-60">
      <md-table id="tableEntree" v-model="carteEntree" md-card>
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

      <md-table id="tablePlat" v-model="cartePlat" md-card>
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

      <md-table id="tableDessert" class="md-alignment-center" v-model="carteDessert" md-card>
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
      <div class="md-layout-item md-size-20">
        <B><U> Menu gastronomique : {{menu.prix}} €</U></B><br />
        <br />
        {{ this.menuGastronomique.entree.nom }} :
        {{ this.menuGastronomique.entree.prix }} € <br /> <br />  <img width="200" height="250" :src="this.menuGastronomique.entree.lien"><br /> <br /> 
        {{ this.menuGastronomique.plat.nom }} :
        {{ this.menuGastronomique.plat.prix }} € <br /> <br />  <img width="200" height="250" :src="this.menuGastronomique.plat.lien"><br /><br />
        {{ this.menuGastronomique.dessert.nom }} :
        {{ this.menuGastronomique.dessert.prix }} € <br /> <br />  <img width="200" height="250" :src="this.menuGastronomique.dessert.lien"><br /><br />
      </div> <br />
    </div>
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

    commande: [],
    totalCommande: 0,

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

        this.calculPrixMenu(gastronomique);
      }
    },
    calculPrixMenu(gastronomique){
      if(gastronomique){
        this.menuGastronomique.prix = (parseInt(this.menuGastronomique.entree.prix) + parseInt(this.menuGastronomique.plat.prix) + parseInt(this.menuGastronomique.dessert.prix))*4/5 ;
      }else{
        this.menu.prix = parseInt(this.menu.entree.prix + this.menu.plat.prix + this.menu.dessert.prix);
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
      let check = 0;
      this.commande.forEach((p) => {
        if(p.nom === item.nom){
          p.nombre++;
          check = 1;
        }
      });
      if (check === 0) {
        this.commande.push(item);
        this.commande[this.commande.length - 1].nombre = 1;
      }
      this.totalCommande += parseInt(item.prix);
    },
    minusProduitToCommande(item){
      if(item.nombre > 0){
        item.nombre--;
        this.totalCommande -= parseInt(item.prix);
      }
      if(item.nombre === 0){
        let length = this.commande.length
        for(let i = 0; i < length; i++){
          if(this.commande[i].nombre === 0){
            this.commande.splice(i, 1)
          }
        }
      }
    },
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
