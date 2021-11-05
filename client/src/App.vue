<template>
  <div id="app" style="margin: 0">
    <div v-if="activeUser != 'null'">
      <md-tabs class="md-primary" md-alignment="fixed" md-sync-route>
        <md-tab id="accueil" md-label="Accueil" to="/" exact></md-tab>

        <md-tab
          id="creation-restaurant"
          md-label="Création de restaurant"
          to="/creation-restaurant"
        ></md-tab>

        <md-tab style="background-color:red"
          id="deconnexion"
          md-label="Deconnexion"
          to="/connexion"
        ></md-tab>
      </md-tabs>
      <router-view></router-view>
    </div>

    <div v-if="activeUser == 'null'">
      <md-tabs class="md-primary" md-alignment="fixed" md-sync-route>
        <md-tab id="connexion" md-label="Connexion" to="/connexion" exact></md-tab>
      </md-tabs>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: () => ({
    activeUser: localStorage.getItem("activeUser"),
  }),
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
