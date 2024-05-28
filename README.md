# Projet Dev Web
Dans ce projet, il y a Maxime TONNELIER, Sean ROGERS, Dieudonné TAKASI, Floris FALELAVAKI, 
Nicolas MARIE-CATHERINE et Jo-Michel UTO

## Introduction
Nous avons créé un Instagram local.
![Home](Z-images_explicatives\home.png)

On a ajouté quelques fonctionnalités comme le moyen de se connecter, upload d'une image et ajout de commentaires.

## 1. Partie Authentification
Cette partie concerne le moyen de se connecter sur la page web.
### a) Création fichier jar
`mvn clean package` (si besoin)

### b) Conteneur Docker
Comme Base de Données, on utilise MongoDB avec Docker, voici la commande de création.
`docker run --name mon_container_mongodb -d -p 27017:27017 mongo`

### c) Commande de lancement
`cd Authentification`;
`java -jar target/Authentification-0.0.1-SNAPSHOT.jar`
ou ouvrir une nouvelle page comme dossier source Authentification,
puis cliquer sur play le fichier "AuthentificationApplication".

### d) Procédure
En cliquant sur le bouton de connexion ou en allant sur http://localhost:5173/login,
on peut soit se connecter directement si on a créé un compte ou continuer avec GitHub.
Si vous cliquez sur le bouton GitHub, cela va se rediriger sur OAuth2 de GitHub pour se connecter.
Dès que vous êtes connecté, cela renvoie sur http://localhost:5173/account avec quelques informations de connexion.
![Login](Z-images_explicatives\page_login.png)
![OAuth2](Z-images_explicatives\redirection_OAuth2_GitHub.png)
![Compte](Z-images_explicatives\compte_connecte.png)

## 2. Partie Images
Cette partie se porte sur la gestion des images. Voici ce que permet cette partie : 
 - upload : mettre une image dans snapgallery
 - affichage acceuil : faire afficher les 20 dernières images de la base de donnée dans l'acceuil
 - GET image ID : permet de récupéré une image à partir de son ID
 ![Image_acceuil](Z-images_explicatives\images_acceuil.png)
 - GET image catégorie : permet de récupéré une image à partir de sa catégorie
 ![Image_acceuil](Z-images_explicatives\images_categorie.png)

### a) Base de donnée
Comme base de donnée nous utilisons mysql.

### b) Comment uploader une image

1- Lorsque vous êtes dans l'acceuil, cliquer sur l'icone de l'appareil photo
2- Une page apparais, complèter ensuite les différentes cases :
![Upload_Image](Z-images_explicatives\upload_image.png)


### a) Installation des librairies
Il faut installer les librairies suivante avant de lancer le code : espress, cors, multer, fs. ouvrir un terminal et executer ces commandes :
`npm init -y`
`npm install express cors multer mysql dotenv`

### b) Lancer le code
Dans un terminal :
- Aller dans le dossier Gestion_Image : `cd Gestion_Image`
- Lancer le fichier : `node app.js`

## 3. Partie Commentaires

### a) Installation des librairies
Il faut importer Flask, SQLALchemy avant de lancer le code

### b) Lancer le code
`cd Commentaires`
`python commentaires.py`


## 4. Partie Docker

