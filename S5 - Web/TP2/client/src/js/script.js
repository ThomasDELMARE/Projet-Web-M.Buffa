window.onload = init;

function init() {
    new Vue({
        el: "#app",
        data: {
            restaurants: [],
            nom: '',
            cuisine: '',
            nbRestaurantsTotal: 0,
            page: 0,
            pagesize: 10,
            nbPagesTotal: 0,
            dernierePage: 0,
            sliderValue:0
        },
        methods: {
            supprimerRestaurant(index) {
                this.restaurants.splice(index, 1);
            },
            ajouterRestaurant(event) {
                // eviter le comportement par defaut
                event.preventDefault();

                this.restaurants.push(
                    {
                        nom: this.nom,
                        cuisine: this.cuisine
                    }
                );
                this.nom = "";
                this.cuisine = "";
            },
            getColor(index) {
                return (index % 2) ? 'lightBlue' : 'pink';
            },
            getRestaurantsFromServer() {
                this.sliderValue = document.getElementById("sliderPage").value;

                let url = "http://localhost:8080/api/restaurants?";
                url += "page=" + this.page;
                url += "&pagesize=" + this.sliderValue;

                fetch(url)
                    // On obtient la réponse en JSON
                    .then((responseJSON) => {
                        // On convertit la réponse JSON qui va la transformer en objet JS
                        responseJSON.json()
                            .then((res) => {
                                // Maintenant res est un vrai objet JavaScript
                                if(this.sliderValue == 0){
                                    this.restaurants = [];
                                }
                                else{
                                    this.restaurants = res.data;
                                }
                                
                                this.nbRestaurantsTotal = res.count;
                                this.nbPagesTotal = Math.round(this.nbRestaurantsTotal / this.pagesize);
                            });
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            pageSuivante() {
                if (this.page === this.nbPagesTotal) {
                    return;
                }
                this.page++;
                this.getRestaurantsFromServer()
            },
            pagePrecedente() {
                if (this.page === 0) {
                    return;
                }

                this.page--;
                this.getRestaurantsFromServer()
            },
            getRestaurantByName(){
                
            }
        },
        mounted() {
            console.log("AVANT RENDU HTML");

            if (window.XMLHttpRequest) {
                request = new XMLHttpRequest();
            }
            else if (window.ActiveXObject) { // IE
                try {
                    request = new ActiveXObject('Msxml2.XMLHTTP');
                }
                catch (e) {
                    try {
                        request = new ActiveXObject('Microsoft.XMLHTTP');
                    }
                    catch (e) { }
                }
            }

            this.getRestaurantsFromServer();
        }
    })
}