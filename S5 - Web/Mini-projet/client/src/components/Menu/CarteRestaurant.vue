<template>
  <div id="CarteRestaurant"  v-if="dataReady">
    <p> Menu : <br>
      {{this.menu.entree.nom}} <br>
      {{this.menu.plat.nom}}<br>
      {{this.menu.dessert.nom}}
    </p>
  </div>
</template>

<script>

//import Produit from "./Produit.js"
//import Menu from "Menu.js"
// import produitsData from "../../assets/json/produits.json"
import data from '../../assets/json/produits.json';

export default {
  
  name: "CarteRestaurant",
  computed: {
    idRestaurant() {
      return this.$route.params.id;
    }
  },
  data: () => ({
      produits: null,
      listeEntrees: [],
      listePlats: [],
      listeDesserts: [],
      menu: null,
      dataReady: false
  }),
  methods: {
    computeAllProducts(){
      this.produits.forEach(p =>{
        if(p.type === "plat"){
          this.listePlats.push(p);
        }
        else if (p.type === "dessert"){
          this.listeDesserts.push(p);
        }
        else if (p.type === "entree"){
          this.listeEntrees.push(p);
        }    
      });
      console.log(this.listeEntrees);
      console.log(this.listePlats);
      console.log(this.listeDesserts);
    },
    createMenu(){
      let idEntree = Math.round(Math.random()*this.listeEntrees.length);
      let idPlat =  Math.round(Math.random()*this.listePlats.length);
      let idDessert =  Math.round(Math.random()*this.listeDesserts.length);

      this.entree = this.listeEntrees[idEntree];
      this.plat = this.listePlats[idPlat];
      this.dessert = this.listeDesserts[idDessert];

      this.menu = {
        entree : this.entree,
        plat: this.plat,
        dessert: this.dessert
      }

      console.log(this.menu);
    }
    /*
          {{this.menu.entree.nom}} <br>
      {{this.menu.plat.nom}} <br>
      {{this.menu.dessert.nom}} <br>

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
    */
  },
  mounted() {
    console.log(data)
    this.produits = data.listeProduits;
    this.computeAllProducts();
    this.createMenu();
    this.dataReady = true;
      //console.log(this.produits)
    // this.creerListeProduits()
    // this.creerMenu(true)
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
