# Définir l'image de base
FROM node:14

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tous les fichiers du projet dans le répertoire de travail
COPY . .

# Exposer le port sur lequel le serveur Node.js va s'exécuter
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["node", "app.js"]
