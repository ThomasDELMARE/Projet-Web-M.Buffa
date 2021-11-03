<template>
  <div id="app">
    <div v-if="activeUser != 'null'">
      <router-link class="router-link" to="/">Accueil</router-link> &nbsp;
      <router-link class="router-link" to="/creation-restaurant"
        >Création de restaurant</router-link
      >
      &nbsp;
      <router-link class="router-link" to="/connexion"
        >Deconnexion</router-link
      >
      &nbsp;
      <router-view></router-view>
    </div>
    <div v-if="activeUser == 'null'">
      <router-link class="router-link" to="/connexion">Connexion</router-link> &nbsp;
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
.router-link{
  color:black !important;
  border-style: solid;
  border-width: 2px;
  padding:3px
}

</style>
