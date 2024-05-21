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
### a) Installation des librairies
Il faut importer cors, espress, multer, fs avant de lancer le code

### b) Lancer le code
`cd Image_NodeJS`
`node gestion_Image.js`

## 3. Partie Commentaires

### a) Installation des librairies
Il faut importer Flask, SQLALchemy avant de lancer le code

### b) Lancer le code
`cd Commentaires`
`python commentaires.py`


## 4. Partie Docker

