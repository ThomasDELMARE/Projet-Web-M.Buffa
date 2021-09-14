import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgpxAL0BI4cvEWE2uTXba8IKqPdbbCgr8",
  authDomain: "miage-tp1.firebaseapp.com",
  projectId: "miage-tp1",
  storageBucket: "miage-tp1.appspot.com",
  messagingSenderId: "436121493848",
  appId: "1:436121493848:web:22cb3e87603a538d2a852d"
};