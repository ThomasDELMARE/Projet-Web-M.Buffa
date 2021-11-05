# MINI-PROJET WEB

Repository de notre projet Web, développé par monsieur **PARIZET Nicolas** et monsieur **DELMARE Thomas**.  

Afin de démarrer le projet il faudra se positionner à la source du projet "serveur" et lancer cette commande :
  - **node serverCrudWithMongo.js**  

Il faudra ensuite démarrer le projet client, se placer à la source du projet "client" et lancer cette commande :
  - **npm run serve**  

Pour se connecter au site, voici vos identifiants :
  - Identifiant : BUFFA  
  - Mot de passe : buffa2021

**Features du projet :**
  -  Fonctions de bases : liste des restaurants, recherche d'un restaurant par son nom, changement du nombre de lignes de la liste, boutons de détail de chacun des retaurants et suppression

<div align="center">
  <img src="https://media.giphy.com/media/Y9x7tApdD8Iep9MMWB/giphy.gif"/>
</div>

  -  Affichage de photographie du restaurant via **l'api Google** et la librairie NPM Google-Images : https://www.npmjs.com/package/google-images
      => Afin d'éviter une surcharge des requêtes via l'API Google qui n'autorise que 100 requête/jours, les URLs sont sauvegardés en base de données pour chaque restaurants lors du premier chargement du détail de celui-ci. Sinon une image par defaut est définie.
      
<div align="center">
  <img src="https://media.giphy.com/media/Y9x7tApdD8Iep9MMWB/giphy.gif"/>
</div>
      
  -  Gestion des utilisateurs **connectés** et persistence des onglets selon la connexion utilisateur via **LocalStorage**
      => Le site n'est pas accessible temps que l'utilisateur n'est pas connecté. Le router est édité en fonction de l'état de connexion.

<div align="center">
  <img src="https://media.giphy.com/media/Y9x7tApdD8Iep9MMWB/giphy.gif"/>
</div>

-  Génération aléatoire de **menus** pour chaque restaurant
      => Les menus et cartes de chacuns des restaurants sont générés aléatoirement via un fichier local json.

<div align="center">
  <img src="https://media.giphy.com/media/Y9x7tApdD8Iep9MMWB/giphy.gif"/>
</div>

  -  Possibilité de faire des **commandes** dans chacun des restaurants (+ persistance ?).
  
<div align="center">
  <img src="https://media.giphy.com/media/Y9x7tApdD8Iep9MMWB/giphy.gif"/>
</div>

  -  Possibilité de créer des restaurants.
      => Les informations de l'addresse peuvent être récupérés plus facilement via la libraire **Algolia Places** https://www.algolia.com/

<div align="center">
  <img src="https://media.giphy.com/media/Y9x7tApdD8Iep9MMWB/giphy.gif"/>
</div>

-  Affichage de l'emplacement des restaurants sur une carte grâce à la librairie **Vue 2 Leaflet** : https://vue2-leaflet.netlify.app/

<div align="center">
  <img src="https://media.giphy.com/media/Y9x7tApdD8Iep9MMWB/giphy.gif"/>
</div>

-  Design de l'application fait avec la libraire **Vue Material** : https://www.creative-tim.com/vuematerial/ 

<div align="center">
  <img src="https://media.giphy.com/media/Y9x7tApdD8Iep9MMWB/giphy.gif"/>
</div>

-  Des Easter Eggs ont été implémentés dans l'applications ! A vous de jouer !
 
<div align="center">
  <img src="https://media.giphy.com/media/Y9x7tApdD8Iep9MMWB/giphy.gif"/>
</div>

**Lien de la base de données utilisée** :  

**Lien de notre Kanban** : https://trello.com/b/Ji2pmYLM/mini-projet-web  

**Lien de notre vidéo de présentation du projet** :
