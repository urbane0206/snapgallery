# Projet Dev Web


Dans ce projet nous avons créer un clone de Youtube mais avec des images composé d'une interface Web et des microservices Web.

![images_acceuil](Z-images_explicatives\images_acceuil.png)

Membres du groupe : Maxime TONNELIER, Sean ROGERS, Dieudonné TAKASI, Nicolas MARIE-CATHERINE, Jo-Michel UTO et Floris FALELAVAKi.


## Fonctionnement du projet


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
![Docker_Stack](Z-images_explicatives\Docker_Stack.png)


## Authentification


### Explication du code :



### Créer un compte ou se conneter

    - Cliquer sur le bouton de connexion : 
![bouton_seconnecter](Z-images_explicatives\bouton_seconnecter.png)
    - Une nouvelle page s'ouvre :
![page_login](Z-images_explicatives\page_login.png) 
    - On peut soit se connecter directement si on a créé un compte ou continuer avec GitHub.
    - Si vous cliquez sur le bouton GitHub, cela va se rediriger sur OAuth2 de GitHub pour se connecter.
    - Dès que vous êtes connecté, cela renvoie sur http://localhost:5173/account avec quelques informations de connexion.
![OAuth2](Z-images_explicatives\redirection_OAuth2_GitHub.png)
![Compte](Z-images_explicatives\compte_connecte.png)


## Commentaires


### Explication du code :

Voici les différents modules qu'on utilise pour cette partie :
    - 

### Uploader une image


## Gestion_Image


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
    - / : Pour vérifier que le serveur fonctionne
    - /upload : qui permet uploader une image. 
    Losqu'une image est uploader :
        - son id, son titre, sa categorie, sa description, le chemin de son emplacement, et la date auquelle l'image a était uploader est stocker dans la base de donnée.
        - l'image est renommer "UserName-date" et stocker dans le dossier "Gestion_Image\uploads\User_name"
    - /images : pour obtenir les 20 dernières images afin de remplir la page d'acceuil
    - /images/:imageID : pour obtenir une image par son ID afin de l'afficher en grand lorsqu'on clique sur une image dans l'acceuil par exemple.
    - images/category//:category : pour obtenir des images par catégorie

### Uploader une image

    - Cliquer sur le bouton d'appareil photo :
![bouton_uploadimage](Z-images_explicatives\bouton_uploadimage.png)
    - Une nouvelle page s'ouvre :
![upload_image](Z-images_explicatives\upload_image.png)   
    - Compléter les différentes cases et cliquer sur Upload

    
    - upload : mettre une image dans snapgallery
 - affichage acceuil : faire afficher les 20 dernières images de la base de donnée dans l'acceuil
 - GET image ID : permet de récupéré une image à partir de son ID
 ![Image_acceuil](Z-images_explicatives\images_acceuil.png)
 - GET image catégorie : permet de récupéré une image à partir de sa catégorie
 ![Image_acceuil](Z-images_explicatives\images_categorie.png)


## Docker


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
