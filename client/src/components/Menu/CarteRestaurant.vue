<template>
  <div id="CarteRestaurant" v-if="dataReady">
    <br />
    <div class="md-layout md-gutter">
      <div class="md-layout-item"></div>
      <div class="md-layout-item md-size-80">

        <!-- Ici on affiche la liste de commande. On pourra ajouter et enlever des produits mais également vider et passer la commande. Le total de la commande s'affichera dynamiquement. -->

        <md-table v-model="commande" md-card>
          <md-table-toolbar>
            <h1 class="md-title">Commande</h1>
          </md-table-toolbar>
          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="Img"
              ><img width="50" height="50" :src="item.lien"
            /></md-table-cell>
            <md-table-cell md-label="Nom">{{ item.nom }}</md-table-cell>
            <md-table-cell md-label="Prix">{{ item.prix }} €</md-table-cell>
            <md-table-cell md-label="Nombre">{{ item.nombre }}</md-table-cell>
            <md-table-cell md-label="Enlever un produit">
              <md-button class="md-primary" @click="ajouterProduitACommande(item)"
                ><img width="24" height="24"
                  src="https://img.icons8.com/material-outlined/24/000000/plus--v1.png"
              /></md-button>
              <md-button v-if="commande.includes(item)"
                class="md-primary"
                @click="enleverProduitACommande(item)"
                ><img width="24" height="24" src="https://img.icons8.com/material-outlined/24/000000/minus-sign.png"
              /></md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>
        <div>
          <md-dialog-confirm
            :md-active.sync="activeConfirmation"
            md-title="Voulez-vous valider votre commande ?"
            md-content="Cette commande sera ajoutée à votre compte."
            md-confirm-text="Confirmer"
            md-cancel-text="Annuler"
            @md-cancel="annulerValidationCommande"
            @md-confirm="confirmerValidationCommande"
          />
          <p>Total : {{ totalCommande }} €</p>
          <br />
          <md-button
            class="md-primary"
            v-if="this.commande.length > 0"
            @click="afficherConfirmationCommande"
            ><img height="24px" width="24px"
              src="https://img.icons8.com/material-outlined/24/000000/shopping-cart--v1.png"
          /></md-button>

          <md-dialog-confirm
            :md-active.sync="activeAnnulation"
            md-title="Voulez-vous vider votre commande ?"
            md-content="Vous ne pourrez pas récupérer le contenu de votre commande."
            md-confirm-text="Confirmer"
            md-cancel-text="Annuler"
            @md-cancel="annulerSuppressionCommande"
            @md-confirm="confirmerSuppressionCommande"
          />
          <md-button
            class="md-primary"
            v-if="this.commande.length > 0"
            @click="showConfirmationAnnulationCommande"
            ><img height="24px" width="24px"
              src="data:image/png;base64,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"
          /></md-button>
        </div>
      </div>
      <div class="md-layout-item"></div>
    </div>

    <!-- Affichage du menu midi ainsi que son ajout et suppression dans le menu commande. -->

    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-20">
        <md-button class="md-primary" @click="ajouterProduitACommande(menu)"
          ><img
            src="https://img.icons8.com/material-outlined/24/000000/plus--v1.png"
        /></md-button>
        <md-button v-if="commande.includes(menu)"
                class="md-primary"
                @click="enleverProduitACommande(menu)"
                ><img width="24" height="24" src="https://img.icons8.com/material-outlined/24/000000/minus-sign.png"
              /></md-button>
        <br />
        <B
          ><U> Menu du midi : {{ menu.prix }} €</U></B
        ><br />
        <br />
        {{ this.menu.entree.nom }} : {{ this.menu.entree.prix }} € <br />
        <br />
        <img width="200" height="250" :src="this.menu.entree.lien" /> <br />
        <br />
        {{ this.menu.plat.nom }} : {{ this.menu.plat.prix }} € <br />
        <br />
        <img width="200" height="250" :src="this.menu.plat.lien" /> <br />
        <br />
        {{ this.menu.dessert.nom }} : {{ this.menu.dessert.prix }} € <br />
        <br />
        <img width="200" height="250" :src="this.menu.dessert.lien" /> <br />
        <br />
      </div>

      <!-- Affichage de la carte des entrées, on affichera 3 produits aléatoirement. On pourra supprimer ou ajouter les différentes entrées. -->

      <div class="md-layout-item md-size-60">
        <md-table id="tableEntree" v-model="carteEntree" md-card>
          <md-table-toolbar>
            <h1 class="md-title">Carte des entrées</h1>
          </md-table-toolbar>
          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="Img"
              ><img width="50" height="50" :src="item.lien"
            /></md-table-cell>
            <md-table-cell md-label="Nom">{{ item.nom }}</md-table-cell>
            <md-table-cell md-label="Prix">{{ item.prix }} €</md-table-cell>
            <md-table-cell md-label="Ajouter au panier">
              <md-button class="md-primary" @click="ajouterProduitACommande(item)"
                ><img
                  src="https://img.icons8.com/material-outlined/24/000000/plus--v1.png"
              /></md-button>
              <md-button v-if="commande.includes(item)"
                class="md-primary"
                @click="enleverProduitACommande(item)"
                ><img width="24" height="24" src="https://img.icons8.com/material-outlined/24/000000/minus-sign.png"
              /></md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>

        <!-- Affichage de la carte des plats, on affichera 3 produits aléatoirement. On pourra supprimer ou ajouter les différentes plats. -->

        <md-table id="tablePlat" v-model="cartePlat" md-card>
          <md-table-toolbar>
            <h1 class="md-title">Carte des plats</h1>
          </md-table-toolbar>
          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="Img"
              ><img width="50" height="50" :src="item.lien"
            /></md-table-cell>
            <md-table-cell md-label="Nom">{{ item.nom }}</md-table-cell>
            <md-table-cell md-label="Prix">{{ item.prix }} €</md-table-cell>
            <md-table-cell md-label="Ajouter au panier">
              <md-button class="md-primary" @click="ajouterProduitACommande(item)"
                ><img
                  src="https://img.icons8.com/material-outlined/24/000000/plus--v1.png"
              /></md-button>
              <md-button v-if="commande.includes(item)"
                class="md-primary"
                @click="enleverProduitACommande(item)"
                ><img width="24" height="24" src="https://img.icons8.com/material-outlined/24/000000/minus-sign.png"
              /></md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>

        <!-- Affichage de la carte des desserts, on affichera 3 produits aléatoirement. On pourra supprimer ou ajouter les différentes desserts. -->

        <md-table
          id="tableDessert"
          class="md-alignment-center"
          v-model="carteDessert"
          md-card
        >
          <md-table-toolbar>
            <h1 class="md-title">Carte des desserts</h1>
          </md-table-toolbar>
          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="Img"
              ><img width="50" height="50" :src="item.lien"
            /></md-table-cell>
            <md-table-cell md-label="Nom">{{ item.nom }}</md-table-cell>
            <md-table-cell md-label="Prix">{{ item.prix }} €</md-table-cell>
            <md-table-cell md-label="Ajouter au panier">
              <md-button class="md-primary" @click="ajouterProduitACommande(item)"
                ><img
                  src="https://img.icons8.com/material-outlined/24/000000/plus--v1.png"
              /></md-button>
              <md-button v-if="commande.includes(item)"
                class="md-primary"
                @click="enleverProduitACommande(item)"
                ><img width="24" height="24" src="https://img.icons8.com/material-outlined/24/000000/minus-sign.png"
              /></md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>
      </div>

      <!-- Affichage du menu gastronomique ainsi que son ajout et suppression dans le menu commande. -->

      <div class="md-layout-item md-size-20">
        <md-button
          class="md-primary"
          @click="ajouterProduitACommande(menuGastronomique)"
          ><img
            src="https://img.icons8.com/material-outlined/24/000000/plus--v1.png"
        /></md-button>
        <md-button v-if="commande.includes(menuGastronomique)"
                class="md-primary"
                @click="enleverProduitACommande(menuGastronomique)"
                ><img width="24" height="24" src="https://img.icons8.com/material-outlined/24/000000/minus-sign.png"
              /></md-button>
        <br />
        <B
          ><U> Menu gastronomique : {{ menuGastronomique.prix }} €</U></B
        ><br />
        <br />
        {{ this.menuGastronomique.entree.nom }} :
        {{ this.menuGastronomique.entree.prix }} € <br />
        <br />
        <img
          width="200"
          height="250"
          :src="this.menuGastronomique.entree.lien"
        /><br />
        <br />
        {{ this.menuGastronomique.plat.nom }} :
        {{ this.menuGastronomique.plat.prix }} € <br />
        <br />
        <img
          width="200"
          height="250"
          :src="this.menuGastronomique.plat.lien"
        /><br /><br />
        {{ this.menuGastronomique.dessert.nom }} :
        {{ this.menuGastronomique.dessert.prix }} € <br />
        <br />
        <img
          width="200"
          height="250"
          :src="this.menuGastronomique.dessert.lien"
        /><br /><br />
      </div>
      <br />
    </div>
    <br />
    <br />

    <!-- Snackbar permettant d'afficher la confirmation de la commande passée. -->
    <md-snackbar
      :md-position="position"
      :md-duration="duration"
      :md-active.sync="showSnackbarCommandeConfirmée"
      md-persistent
    >
      <span>Commande enregistrée ! Merci pour votre commande !</span>
    </md-snackbar>
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

    activeConfirmation: false,
    activeAnnulation:false,
    showSnackbarCommandeConfirmée: false,
    position: "center",
    duration: 4000,
    dataReady: false,
  }),
  methods: {
    chargerProduits() {
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
    creerMenu(gastronomique) {
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
          nom: "Menu du gastronomique",
          entree: this.entreeGastronomique,
          plat: this.platGastronomique,
          dessert: this.dessertGastronomique,
          nombre: 0,
          lien: "data:image/png;base64,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",
        };
        this.calculPrixMenu(gastronomique);
      } else {
        let idEntree = parseInt(
          Math.random() * this.listeEntreesStandards.length
        );
        let idPlat = parseInt(Math.random() * this.listePlatsStandards.length);
        let idDessert = parseInt(
          Math.random() * this.listeDessertsStandards.length
        );

        this.entree = this.listeEntreesStandards[idEntree];
        this.plat = this.listePlatsStandards[idPlat];
        this.dessert = this.listeDessertsStandards[idDessert];

        this.menu = {
          nom: "Menu du midi",
          entree: this.entree,
          plat: this.plat,
          dessert: this.dessert,
          nombre: 0,
          lien: "data:image/png;base64,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",
        };
        this.calculPrixMenu(gastronomique);
      }
    },
    calculPrixMenu(gastronomique) {
      if (gastronomique) {
        this.menuGastronomique.prix =
          ((parseInt(this.menuGastronomique.entree.prix) +
            parseInt(this.menuGastronomique.plat.prix) +
            parseInt(this.menuGastronomique.dessert.prix)) *
            4) /
          5;
      } else {
        this.menu.prix =
          ((parseInt(this.menu.entree.prix) +
            parseInt(this.menu.plat.prix) +
            parseInt(this.menu.dessert.prix)) *
            4) /
          5;
      }
    },
    creerCarte() {
      this.creerCarteEntree();
      this.creerCartePlat();
      this.creerCarteDessert();
    },
    creerCarteEntree() {
      let ids = [];
      let id;
      for (let i = 0; i < 3; i++) {
        id = parseInt(Math.random() * this.listeEntrees.length);
        ids.push(id);
      }
      while (ids[0] === ids[1] || ids[0] === ids[2] || ids[1] === ids[2]) {
        ids = [];
        for (let i = 0; i < 3; i++) {
          id = parseInt(Math.random() * this.listeEntrees.length);
          ids.push(id);
        }
      }
      ids.forEach((id) => {
        this.carteEntree.push(this.listeEntrees[id]);
      });
    },
    creerCartePlat() {
      let ids = [];
      let id;
      for (let i = 0; i < 3; i++) {
        id = parseInt(Math.random() * this.listePlats.length);
        ids.push(id);
      }
      while (ids[0] === ids[1] || ids[0] === ids[2] || ids[1] === ids[2]) {
        ids = [];
        for (let i = 0; i < 3; i++) {
          id = parseInt(Math.random() * this.listePlats.length);
          ids.push(id);
        }
      }
      ids.forEach((id) => {
        this.cartePlat.push(this.listePlats[id]);
      });
    },
    creerCarteDessert() {
      let ids = [];
      let id;
      for (let i = 0; i < 3; i++) {
        id = parseInt(Math.random() * this.listeDesserts.length);
        ids.push(id);
      }
      while (ids[0] === ids[1] || ids[0] === ids[2] || ids[1] === ids[2]) {
        ids = [];
        for (let i = 0; i < 3; i++) {
          id = parseInt(Math.random() * this.listeDesserts.length);
          ids.push(id);
        }
      }
      ids.forEach((id) => {
        this.carteDessert.push(this.listeDesserts[id]);
      });
    },
    ajouterProduitACommande(item) {
      let check = 0;
      this.commande.forEach((p) => {
        if (p.nom === item.nom) {
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
    enleverProduitACommande(item) {
      if (item.nombre > 0) {
        item.nombre--;
        this.totalCommande -= parseInt(item.prix);
      }
      if (item.nombre === 0) {
        let length = this.commande.length;
        for (let i = 0; i < length; i++) {
          if (this.commande[i].nombre === 0) {
            this.commande.splice(i, 1);
          }
        }
      }
    },
    annulerValidationCommande() {
      return;
    },
    confirmerValidationCommande() {
      this.passerCommande();
    },
    afficherConfirmationCommande() {
      this.activeConfirmation = true;
    },
    annulerSuppressionCommande(){
      return;
    },
    confirmerSuppressionCommande(){
      this.viderCommande();
    },
    showConfirmationAnnulationCommande(){
      this.activeAnnulation = true;
    },
    passerCommande() {
      let currentUser = localStorage.getItem("activeUser");

      if (!localStorage.getItem(currentUser + "Commandes")) {
        localStorage.setItem(currentUser + "Commandes", this.commande);
      } else {
        let currentListeCommandes = localStorage.getItem(
          currentUser + "Commandes"
        );
        let newListCommandes = currentListeCommandes + this.commande;
        localStorage.setItem(currentUser + "Commandes", newListCommandes);
      }

      this.showSnackbarCommandeConfirmée = true;

      this.commande = [];
      this.totalCommande = 0;
    },
    viderCommande(){
      this.commande = [];
      this.totalCommande = 0;
    }
  },
  mounted() {
    this.produits = data.listeProduits;
    this.chargerProduits();
    this.creerMenu(false);
    this.creerMenu(true);
    this.creerCarte();
    this.dataReady = true;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
