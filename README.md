# MINI-PROJET WEB

Repository de notre projet Web, développé par monsieur **PARIZET Nicolas** et monsieur **DELMARE Thomas**.  

Afin de démarrer le projet il faudra se positionner à la source du projet "serveur" et lancer cette commande :
  - **node serverCrudWithMongo.js**  

Il faudra ensuite démarrer le projet client, se placer à la source du projet "client" et lancer cette commande :
  - **npm run serve**  

Il est aussi préférable de nettoyer les données présentes dans votre localStorage sur http://localhost:8081/. Des données parasites pourraient entrainer le mal fonctionnement de l'historique des commandes et de l'authentification.

Pour se connecter au site, voici vos identifiants :
  - Identifiant : BUFFA  
  - Mot de passe : buffa2021

**Features du projet :**
  -  Fonctions de bases : liste des restaurants, recherche d'un restaurant par son nom, changement du nombre de lignes de la liste, boutons de détail de chacun des retaurants et suppression

<br />

<div align="center">
  <img src="https://media.giphy.com/media/sMP3i5b6qGQHvSIFvR/giphy.gif"/>
</div>

<br />

  -  Affichage de photographie du restaurant via **l'api Google** et la librairie NPM Google-Images : https://www.npmjs.com/package/google-images
      => Afin d'éviter une surcharge des requêtes via l'API Google qui n'autorise que 100 requête/jours, les URLs sont sauvegardés en base de données pour chaque restaurants lors du premier chargement du détail de celui-ci. Sinon une image par defaut est définie.
 
<br />

<div align="center">
  <img src="https://media.giphy.com/media/zpehynVnhUkbPMMGGy/giphy.gif"/>
</div>

<br />
      
  -  Gestion des utilisateurs **connectés** et persistence des onglets selon la connexion utilisateur via **LocalStorage**
      => Le site n'est pas accessible temps que l'utilisateur n'est pas connecté. Le router est édité en fonction de l'état de connexion.

<br />

<div align="center">
  <img src="https://media.giphy.com/media/t2ZzesoEGVEGgDuuOt/giphy.gif"/>
</div>

<br />

-  Génération aléatoire de **menus** pour chaque restaurant
      => Les menus et cartes de chacuns des restaurants sont générés aléatoirement via un fichier local json.

<br />

<div align="center">
  <img src="https://media.giphy.com/media/zW3VgwAYNWMOGoZsJC/giphy.gif"/>
</div>

<br />

  -  Possibilité de faire des **commandes** dans chacun des restaurants.
  
<br />

<div align="center">
  <img src="https://media.giphy.com/media/GOiwo3YE8nkEjpcxfb/giphy.gif"/>
</div>

<br />

  - Possibilité de consulter les commandes passées grâce à l'onglet d'historique des commandes !

<br />

<div align="center">
  <img src="https://media.giphy.com/media/XNPsmALeEoK0sToMpQ/giphy.gif"/>
</div>

<br />

  -  Possibilité de créer des restaurants.
      => Les informations de l'addresse peuvent être récupérés plus facilement via la libraire **Algolia Places** https://www.algolia.com/

<br />

<div align="center">
  <img src="https://media.giphy.com/media/zeDb3FwJ8mcBeRUIY7/giphy.gif"/>
</div>

<br />

-  Affichage de l'emplacement des restaurants sur une carte grâce à la librairie **Vue 2 Leaflet** : https://vue2-leaflet.netlify.app/

<br />

<div align="center">
  <img src="https://media.giphy.com/media/5BtFiV3pgr7BDcJ4U7/giphy.gif"/>
</div>

<br />

-  Design de l'application fait avec la libraire **Vue Material** : https://www.creative-tim.com/vuematerial/ 

<br />

<div align="center">
  <img src="https://media.giphy.com/media/Y9x7tApdD8Iep9MMWB/giphy.gif"/>
</div>

<br />

-  Des Easter Eggs ont été implémentés dans l'applications ! A vous de jouer !
 
<br />

<div align="center">
  <img src="https://media.giphy.com/media/uikTX95XMDAdTbiFH8/giphy.gif"/>
</div>

<br />

**Lien de notre Kanban** : https://trello.com/b/Ji2pmYLM/mini-projet-web  

**Lien de notre vidéo de présentation du projet** : https://youtu.be/9bXquQ6WDWg
