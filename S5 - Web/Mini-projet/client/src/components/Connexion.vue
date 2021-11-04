<template>
  <div username="connexion">
    <br />

    <h1>Identifiez-vous afin de commander dans les restaurants !</h1>

    <br />

    <form style="width: 500px; margin: auto" v-on:keyup.enter="connexion" v-on:submit="connexion">
      <md-field>
        <label>Nom d'utilisateur</label>
        <md-input style="width: 100px" name="username" type="text" required v-model="username" />
      </md-field>

      <md-field>
        <label>Mot de passe</label>
        <md-input name="password" type="password" required v-model="password" />
      </md-field>

      <br />

      <md-button class="md-raised md-primary" v-on:click="connexion"
        >Se connecter</md-button
      >
      <md-button class="md-raised md-primary" v-on:click="creerCompte"
        >Créer un compte</md-button
      >

      <br />
      <br />
    </form>

    <!-- Mauvais mot de passe utilisateur -->
    <md-snackbar
      :md-position="position"
      :md-duration="duration"
      :md-active.sync="showWrongPasswordSnackbar"
      md-persistent
    >
      <span>Connexion échouée, votre mot de passe est incorrect.</span>
    </md-snackbar>

    <!-- Compte n'existe pas -->
    <md-snackbar
      :md-position="position"
      :md-duration="duration"
      :md-active.sync="showNoExistingAccountSnackbar"
      md-persistent
    >
      <span
        >Connexion échouée, votre identifiant n'est pas présent dans la base de
        données.</span
      >
    </md-snackbar>

    <!-- Compte créée -->
    <md-snackbar
      :md-position="position"
      :md-duration="duration"
      :md-active.sync="showAccountCreatedSnackbar"
      md-persistent
    >
      <span
        >Compte créée ! Afin d'utiliser l'application, connectez-vous !</span
      >
    </md-snackbar>

    <!-- Compte déja créee -->
    <md-snackbar
      :md-position="position"
      :md-duration="duration"
      :md-active.sync="showAccountAlreadyCreated"
      md-persistent
    >
      <span> Compte déjà créée, connectez-vous !</span>
    </md-snackbar>

    <!-- Username et password vide -->
    <md-snackbar
      :md-position="position"
      :md-duration="duration"
      :md-active.sync="showEmptyCredentialsSnackbar"
      md-persistent
    >
      <span>Veuillez entrer un mot de passe et un nom d'utilisateur.</span>
    </md-snackbar>

    <!-- Nice try ! -->
    <md-snackbar
      :md-position="position"
      :md-duration="duration"
      :md-active.sync="showNiceTrySnackbar"
      md-persistent
    >
      <span>Really ? Nice try :)</span>
    </md-snackbar>
  </div>
</template>

<script>
export default {
  name: "Connexion",
  components: {},
  data: () => ({
    username: null,
    password: null,
    activeUser: null,
    position: "center",
    duration: 4000,

    showAccountCreatedSnackbar: false,
    showNoExistingAccountSnackbar: false,
    showWrongPasswordSnackbar: false,
    showAccountAlreadyCreated: false,
    showEmptyCredentialsSnackbar: false,
    showNiceTrySnackbar: false
  }),
  methods: {
    localStorageBuild() {
      // Cas où il y a un utilisateur connecté
      //   if (localStorage.getItem("activeUser") != "null") {
      //     if (this.username != null || this.username != "") {
      //       this.activeUser = localStorage.getItem("activeUser");
      //     }
      //   }

      // On génère un utilisateur de base si il n'est pas déjà déclaré
      if (!localStorage.getItem("DELMARE")) {
        localStorage.setItem("DELMARE", "delmare2021");
      }

      // On génère un utilisateur de base si il n'est pas déjà déclaré
      if (!localStorage.getItem("PARIZET")) {
        localStorage.setItem("PARIZET", "parizet2021");
      }

      // On génère un utilisateur de base si il n'est pas déjà déclaré
      if (!localStorage.getItem("ADMIN")) {
        localStorage.setItem("ADMIN", "admin2021");
      }

      // On génère un utilisateur de base si il n'est pas déjà déclaré
      if (!localStorage.getItem("BUFFA")) {
        localStorage.setItem("BUFFA", "buffa2021");
      }

      // Au démarrage, on paramètre un activeUser null
      if (!localStorage.getItem("activeUser")) {
        localStorage.setItem("activeUser", "null");
      }
    },
    connexion() {
      let username = this.username;
      let password = this.password;

      // Cas où le formulaire de connexion envoyée est vusernamee dans les deux champs
      if (username == "" || password == "") {
        this.showEmptyCredentialsSnackbar = true;
        return;
      }
      
      if(username == "admin" || password == "admin"){
        this.showNiceTrySnackbar = true;
        return;
      }

      if(username == "atari breakout"){
        document.location.replace("https://elgoog.im/breakout/");
        return;
      }

      // Cas où le formulaire de connexion envoyée permet de connecter l'utilisateur
      if (
        localStorage.getItem(username) &&
        localStorage.getItem(username) == password
      ) {
        localStorage.setItem("activeUser", username);
        this.$router.push("/");
        location.reload();
      }

      // Cas où le formulaire de connexion envoyée a un username présent dans la base de données mais un mauvais mot de passe
      if (
        localStorage.getItem(username) &&
        localStorage.getItem(username) != password
      ) {
        this.showWrongPasswordSnackbar = true;
        return;
      }

      // Cas où l'identifiant n'est pas présent dans la base de données
      else {
        this.showNoExistingAccountSnackbar = true;
        return true;
      }
    },
    creerCompte() {
      let username = this.username;
      let password = this.password;

      // Cas où l'utilisateur veut créer un compte est déjà présent dans la base de données
      if (
        localStorage.getItem(username) &&
        (username != "") & (password != "")
      ) {
        this.showAccountAlreadyCreated = true;
      }

      // Cas où l'utilisateur veut créer un compte vide
      if (username == "" || password == "") {
        this.showEmptyCredentialsSnackbar = true;
      }

      // Cas où l'utilisateur a correctement créer son compte
      if (!localStorage.getItem(username) && password != "" && username != "") {
        localStorage.setItem(username, password);
        this.showAccountCreatedSnackbar = true;
      }

      // On réinitialise les valeurs dans le formulaire de connexion
      this.username = "";
      this.password = "";
    }
  },
  mounted() {
    this.localStorageBuild();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
