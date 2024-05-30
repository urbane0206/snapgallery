# Projet Dev Web


Dans ce projet nous avons créer un clone de Youtube mais avec des images composé d'une interface Web et des microservices Web.

![images_acceuil](https://github.com/urbane0206/snapgallery/assets/108905191/6880d079-f7d4-421d-90dc-46cace767a2d)

Membres du groupe : Maxime TONNELIER, Sean ROGERS, Dieudonné TAKASI, Nicolas MARIE-CATHERINE, Jo-Michel UTO et Floris FALELAVAKi.

# Réparition du projet 

- Dieudonné et Sean se sont occupés de la partie Authentification [II - Authentification](#ii---authentification)
- Jo-Michel et Floris se sont occupés de la partie des commentaires [III - Commentaires](#iii---commentaires)
- Maxime s'est occupé de la gestion des images et du front-end [IV - Gestion_Image](#iv---gestion_image) 
- Nicolas s'est occupé de la partie Docker [V - Docker](#v---docker)
  
- Chaque sous-groupe à rédiger la documentation de sa propre partie.

## I - Fonctionnement du projet


Voici les différents microservices de notre projet :
    
 - Authentification : Permet aux utilisateurs de créer un compte et de s'authentifier.
 - Commentaire : Permet de commenter, modifier ou supprimer des commentaires, ainsi que d'ajouter des pouces vers le haut ou vers le bas sur une image.
 - Gestion_Image : Permet aux utilisateurs de télécharger ou de supprimer une image.

Chaque microservice est implémenté avec un langage différent :
 
 - Authentification : Java Spring Boot
 - Commentaire : Python
 - Gestion_Image : NodeJS

Chaque microservice utilise également une base de données différente :
 
 - Authentification : MongoDB
 - Commentaire : PostgreSQL
 - Gestion_Image : MySQL

Pour notre projet nous utilisons un DOCKER STACK qui possède 7 conteneurs : 

![Docker_Stack](https://github.com/urbane0206/snapgallery/blob/main/Z-images_explicatives/Docker_Stack.png)


## II - Authentification

### Explication du code :
Ce micro-service d'authentification simple construit à l'aide de Spring Boot. 
Il permet la création et la gestion des comptes utilisateurs ainsi que l'authentification via des en-têtes HTTP de base.

- **Account** : Représente un compte utilisateur avec des champs tels que `id`, `nom`, `prenom`, `userName`, `password`, `email`, etc.
- **AccountController** : Contrôleur Spring qui gère les requêtes HTTP pour les opérations sur les comptes utilisateurs.
- **AccountRepository** : Interface Spring Data pour les opérations de persistance sur les comptes utilisateurs.
- **AuthentificationApplication** : Classe principale pour démarrer l'application Spring Boot.
- **AuthHeaderBuilder** : Fournit une méthode pour créer des en-têtes d'authentification de base encodés en Base64.
- **codeToToken** : Représente les données nécessaires pour convertir un code d'autorisation en jeton d'accès.
- **WebConfig** : Configuration CORS pour permettre les requêtes provenant de l'origine spécifiée.

### Créer un compte ou se conneter

 - Cliquer sur le bouton de connexion : 

![bouton_seconnecter](https://github.com/urbane0206/snapgallery/assets/108905191/90e7bf99-2733-427c-a924-e1d8d294331f)

 - Une nouvelle page s'ouvre :

![page_login](https://github.com/urbane0206/snapgallery/blob/main/Z-images_explicatives/page_login.png)


 - On peut soit se connecter directement si on a créé un compte ou continuer avec GitHub.
 - Si vous cliquez sur le bouton GitHub, cela va se rediriger sur OAuth2 de GitHub pour se connecter.
 - Dès que vous êtes connecté, cela renvoie sur http://localhost:5173/account avec quelques informations de connexion.

![redirection_OAuth2_GitHub](https://github.com/urbane0206/snapgallery/assets/108905191/389f5109-33c8-43c8-89df-6f1fee7404db)

 - Un ecran de chargement est affiché pendant l'attente de la connexion.

![loading](https://github.com/urbane0206/snapgallery/blob/main/Z-images_explicatives/loading.png)

- Page du profil (Cliquez sur le boutton deconnecter si vous souhaitez vous deconnecter).

![compte_connecte](https://github.com/urbane0206/snapgallery/assets/108905191/73caaf16-5c08-41d1-a909-6b98d565fe92)


## III - Commentaires


### Explication du code :
Cette application utilise Flask pour gérer les "likes" et les "dislikes" sur des images et des commentaires. Elle utilise PostgreSQL pour la gestion de la base de données.

## Configuration

1. **Initialisation de l'application** :
    - `Flask` pour créer l'application web.
    - `CORS` pour permettre les requêtes cross-origin.
    - `SQLAlchemy` pour l'interaction avec la base de données.
    - `Migrate` pour gérer les migrations de la base de données.

2. **Modèles de Données** :
    - `ImageLike` : Représente les "likes" sur les images.
    - `CommentLike` : Représente les "likes" sur les commentaires.
    - `Comment` : Représente les commentaires.

## Routes de l'API

- `GET /comments` : Récupère tous les commentaires.
- `POST /comments` : Ajoute un nouveau commentaire.
- `POST /comments/<int:comment_id>/like` : Ajoute un "like" à un commentaire.
- `POST /comments/<int:comment_id>/dislike` : Ajoute un "dislike" à un commentaire.
- `GET /comments/<int:comment_id>/like` : Récupère le nombre de "likes" d'un commentaire.
- `GET /comments/<int:comment_id>/dislike` : Récupère le nombre de "dislikes" d'un commentaire.


## IV - Gestion_Image


### Explication du code :

Voici les différents modules qu'on utilise pour cette partie : 
 - EXPRESS pour créer l'applications web 
 - CORS pour les requêtes (POST, GET...) 
 - MULTER pour la gestion des données
 - PATH pour les chemins
 - MYSQL pour la base de donnée
 - FS pour interagir avec le système de fichier 
 - DOTENV pour charger les variables d'envirennement définies dans un fichier

Voici les différentes routes que nous avions implémenter :
 - GET / : Pour vérifier que le serveur fonctionne
 - POST /upload : qui permet uploader une image. 
   Losqu'une image est uploader :
     - son id, son titre, sa categorie, sa description, le chemin de son emplacement, et la date auquelle l'image a était uploader est stocker dans la base de donnée.
     - l'image est renommer "UserName-date" et stocker dans le dossier "Gestion_Image\uploads\User_name"
 - GET /images : pour obtenir les 20 dernières images afin de remplir la page d'acceuil
 - GET /images/:imageID : pour obtenir une image par son ID afin de l'afficher en grand lorsqu'on clique sur une image dans l'acceuil par exemple.
 - GET /images/category/:category : pour obtenir des images par catégorie

### Uploader une image

 - Cliquer sur le bouton d'appareil photo :

![bouton_uploadimage](https://github.com/urbane0206/snapgallery/assets/108905191/fc15e115-2a2d-4c04-abf1-4dbba62c2d04)

 - Une nouvelle page s'ouvre :

![upload_image](https://github.com/urbane0206/snapgallery/blob/main/Z-images_explicatives/upload_image.png)

 - Compléter les différentes cases et cliquer sur Upload
 - Votre image sera affiché sur la page d'accueil

![feed close](https://github.com/urbane0206/snapgallery/blob/main/Z-images_explicatives/feed_close.png)

- Il est possible de faire une recherche afin de trouver l'image en cliquant sur la barre de recherche de l'accueil et en mettant un mot ayant un lien avec votre image (pour cela nous avons utilisé des requetes rejecs de MySQL) exemple :

![search](https://github.com/urbane0206/snapgallery/blob/main/Z-images_explicatives/search.png)

- Pour rechercher votre image il est aussi possibles de faire une recherche par catégories en cliquant sur la barre des catégories

![feed](https://github.com/urbane0206/snapgallery/blob/main/Z-images_explicatives/feed.png)

- Lorsque vous voulez interagir avec une photo (commenter , liker ...) vous cliquez dessus




## V - Docker


Cette Partie se concentre  sur le lancement de l'application via docker-compose !

Pour cela, un fichier docker-compose.yml a été créé dans le but lancer l'application sans avoir à installer touts les pré-requis sur notre ordinateur. Ce fichier va créé un conteneur pour chaque service de l'application et installer toutes les dépendances dont ils  ont besoins pour fonctionner correctement.


## Lancement de l'application 


### Pré-requis 

- Avoir installé maven sur votre ordinateur.
- Si Maven n'est pas installé vous pouvez le trouver ici : https://maven.apache.org/

### 1) Création d'un fichier .jar

La première étape pour lancer l'application, est de créer un fichier .jar pour lancer le microservice d'authentification.
Pour cela :

- Ouvrir le projet dans un IDE ( ex: Vs Code)
- Ouvrir un terminal de commande.
- Se rendre dans le dossier "Authentification" grâce à la commande : `cd ./Authentification`.
- Une fois dans le dossier , utiliser la commande : `mvn clean package` pour créer le fichier .jar du microservice.

### 2) lancer l'application 

- On retourne à la racine du projet avec la commande : `cd ../`
- On utilise la commande : `docker-compose up --build`.

 
<b><i>Une fois ces étapes réalisées , les conteneurs vont être créés puis lancés un par un. Enfin l'application sera disponible sur : http://locahost:5173</i></b>
