<template>
    <div v-if="dataReady">

        <md-table v-model="commandes" md-card>
          <md-table-toolbar>
            <h1 class="md-title">Historique des commandes</h1>
          </md-table-toolbar>
          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="Date">{{ item.date }}</md-table-cell>
            <md-table-cell md-label="Prix">{{ item.total }} €</md-table-cell>
            <md-table-cell md-label="Detail commande">
              <md-button class="md-primary" @click="detailCommande(item)"
                ><img width="24" height="24"
                  src="https://img.icons8.com/material-outlined/24/000000/plus--v1.png"
              /></md-button>
              </md-table-cell>
          </md-table-row>
        </md-table>

        <md-dialog :md-active.sync="showDialog">

        <md-table v-model="commande" md-card>
          <md-table-toolbar>
            <h1 class="md-title">Détail de la commande</h1>
          </md-table-toolbar>
          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="Img"
              ><img width="50" height="50" :src="item.lien"
            /></md-table-cell>
            <md-table-cell md-label="Nom">{{ item.nom }}</md-table-cell>
            <md-table-cell md-label="Prix">{{ item.prix }} €</md-table-cell>
            <md-table-cell md-label="Nombre">{{ item.nombre }}</md-table-cell>
          </md-table-row>
        </md-table>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Fermer</md-button>
      </md-dialog-actions>
    </md-dialog>
    </div>
</template>

<script>
export default {
  name: "HistoriqueCommande",
  data: () => ({
      commandes: null,
      dataReady: false,
      commande:null,
      showDialog: false
  }),
  methods: {
    checkIfUserConnected(){
      if(localStorage.getItem("activeUser") == "null" || localStorage.getItem("activeUser") == "" || localStorage.getItem("activeUser") == null){
        document.location.replace("/connexion");
      }
    },
    initCommande(){
        let currentUser = localStorage.getItem("activeUser");
        if (localStorage.getItem(currentUser + "Commandes")) {
            let dataStringCommande = localStorage.getItem(currentUser + "Commandes");
            console.log(dataStringCommande)
            this.commandes = JSON.parse(dataStringCommande);
        }
    },
    detailCommande(item){
        this.commande = JSON.parse(item.commande);
        console.log(this.commande)

        this.showDialog = true;
    }
  },
  mounted() {
      this.checkIfUserConnected();
      this.initCommande();
      this.dataReady = true;

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
