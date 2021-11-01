<template>
  <div>

  </div>
</template>

<script>

import Produit from "./Produit.js"
// import Menu from "Menu.js"
// import produitsData from "../../assets/json/produits.json"

export default {
  name: "CarteRestaurant",
  data: () => ({
      produits: null,
      listeProduits: null,
      listeEntrees: null,
      listePlats: null,
      listeDesserts: null,
      tempList: null
  }),
  methods: {
    creerListeProduits(){
      this.listeProduits = []

      for(let i = 0; i < this.produits.length; i++){
        let temp = new Produit(this.produits[i].nom, this.produits[i].type, this.produits[i].cuisine, this.produits[i].gastronomique, this.produits[i].lien)
        this.listeProduits.push(temp)
        console.log(temp)
      }

      return this.listeProduits
    },
    creerListeEntrees(gastronomique){
        this.tempList = []
        
        for(let i = 0; i < this.produits.length; i++){
            if(this.produits[i].type == "entree" && this.produits[i].gastronomique == gastronomique) {    
                let temp = new Produit(this.produits[i].nom, this.produits[i].type, this.produits[i].cuisine, this.produits[i].gastronomique, this.produits[i].lien)
                this.tempList.push(temp)
            }
        }

        return this.tempList;
    },
    creerListePlats(gastronomique){
        this.tempList = []
        
        for(let i = 0; i < this.produits.length; i++){
            if(this.produits[i].type == "plat" && this.produits[i].gastronomique == gastronomique) {    
                let temp = new Produit(this.produits[i].nom, this.produits[i].type, this.produits[i].cuisine, this.produits[i].gastronomique, this.produits[i].lien)
                this.tempList.push(temp)
            }
        }

        return this.tempList;
    },
    creerListeDesserts(gastronomique){
        let tempList = []
        console.log(this.produits.length)
        
        for(let i = 0; i < this.produits.length; i++){
            if(this.produits[i].type == "dessert" && this.produits[i].gastronomique == gastronomique) {    
                let temp = new Produit(this.produits[i].nom, this.produits[i].type, this.produits[i].cuisine, this.produits[i].gastronomique, this.produits[i].lien)
                tempList.push(temp)
            }
        }

        return tempList;
    },
    creerMenu(gastronomique){
        console.log(gastronomique)

        // // On crée une liste d'entrées gastronomiques
        // this.listeEntrees = this.creerListeEntrees(gastronomique)
        // // console.log("Liste entrees : ", this.listeEntrees)

        // // On crée une liste de plats gastronomiques
        // this.listePlats = this.creerListePlats(gastronomique)
        // // console.log(this.listePlats)
        
        // // On crée une liste de desserts gastronomiques
        // this.listeDesserts = this.creerListeDesserts(gastronomique)
        // // console.log(this.listeDesserts)
        
    }
  },
  mounted() {
      this.produits = JSON.parse('../../assets/json/produits.json')
      console.log(this.produits)
    // this.creerListeProduits()
    // this.creerMenu(true)
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
