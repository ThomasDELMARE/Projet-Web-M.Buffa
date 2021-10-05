<template>
    <div>
    <h1> Création d'un nouveau restaurant </h1>


        <label>
        Nom : <md-input name="nom" type="text" required v-model="nom" />
      </label>

    <form v-on:submit="ajouterRestaurant">
        <md-field>
            <label>Entrer un nom</label>
            <md-input name="nom" type="text" required v-model="nom"></md-input>
            <!-- <span class="md-helper-text">Helper text</span> -->
        </md-field>

        <md-field>
            <label>Entrer la cuisine</label>
            <md-input name="cuisine" type="text" required v-model="cuisine"></md-input>
        </md-field>

        <md-field>
            <label>Entrer une ville</label>
            <md-input name="ville" type="text" required v-model="ville"></md-input>
        </md-field>

        <md-field>
            <label>Entrer un zipcode</label>
            <md-input name="zipcode" type="text" required v-model="zipcode"></md-input>
        </md-field>

        <md-field>
            <label>Entrer un adresse</label>
            <md-input name="addresse" type="text" required v-model="addresse"></md-input>
        </md-field>
     
        <md-button class="md-raised md-primary">Primary</md-button>
        <button>Ajouter</button>
    </form>
    </div>
</template>

<script>

export default {
    name : 'CreationRestaurant',
    methods: {
    ajouterRestaurant(event) {
        // eviter le comportement par defaut
        event.preventDefault();

        let form = event.target;
        let donneesFormulaire = new FormData(form);
        let url = "http://localhost:8080/api/restaurants";

        fetch(url, {
        method: "POST",
        body: donneesFormulaire,
        })
        .then((responseJSON) => {
            responseJSON.json().then((res) => {
            // Maintenant res est un vrai objet JavaScript
            console.log("Restaurant ajouté, " + res.msg);
            // On rafraichit la vue
            this.getRestaurantsFromServer();
            });
        })
        .catch((err) => {
            console.log(err);
        });

        this.nom = "";
        this.cuisine = "";
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
