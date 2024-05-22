const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql');
const fs = require('fs');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Utiliser le middleware CORS avec une configuration permissive
app.use(cors({
  origin: 'http://localhost:5173', // Autorise les requêtes de cette origine
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Permet l'envoi de cookies si nécessaire
}));

// Middleware pour parser le JSON et les requêtes de type urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/Gestion_Image/uploads', express.static(path.join(__dirname, 'Gestion_Image/uploads')));

// Configuration de Multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const userId = req.body.userId;
    if (!userId) {
      console.error('Erreur: userId est indéfini');
      return cb(new Error('userId est requis'), null);
    }

    // Assurez-vous que le chemin de la destination contient 'Gestion_Image' plutôt que 'app'
    const dir = path.join(__dirname, 'uploads', userId);
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function(req, file, cb) {
    const date = new Date().toISOString().replace(/:/g, '-'); // Format de la date
    const filename = `${req.body.userId}-${date}${path.extname(file.originalname)}`;
    cb(null, filename);
  }
});


// Configurer multer pour gérer les fichiers et les champs textuels
const upload = multer({ storage: storage }).fields([
    { name: 'file', maxCount: 1 },
    { name: 'userId', maxCount: 1 },
    { name: 'title', maxCount: 1 },
    { name: 'category', maxCount: 1 },  // Ajout du champ category
    { name: 'description', maxCount: 1 }
  ]);

// Configuration MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
    process.exit(1);
  }
  console.log('Connecté à la base de données');
});

// Route GET pour vérifier que le serveur fonctionne
app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur Snap Gallery!');
});

// Route pour l'upload d'un fichier
app.post('/upload', upload, (req, res) => {
  console.log('Requête reçue:', req.body);
  console.log('Fichier:', req.files);

  const { userId, title, category, description } = req.body;
  if (!userId || !title || !category || !description) {
    console.error('Erreur: Paramètres manquants');
    return res.status(400).send('Paramètres manquants');
  }

  // Construire l'URL correcte pour l'enregistrer dans la base de données ou pour la renvoyer
  const filePath = `http://localhost:5173/Gestion_Image/uploads/${userId}/${req.files.file[0].filename}`;

  const date = new Date();
  const sql = 'INSERT INTO images (userId, title, category, description, filePath, uploadDate) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [userId, title, category, description, filePath, date], (err, result) => {
    if (err) {
      console.error("Erreur lors de l'insertion des données:", err);
      return res.status(500).send("Erreur lors de l'insertion des données");
    }
    res.send('Image téléchargée avec succès!');
  });
});

// Route pour obtenir les dernières images
app.get('/images', async (req, res) => {
  const sql = 'SELECT * FROM images ORDER BY uploadDate DESC LIMIT 20';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des images:', err);
      return res.status(500).send('Erreur lors de la récupération des images');
    }
    res.json(results);
  });
});


app.get('/images/:imageId', (req, res) => {
  const imageId = req.params.imageId;
  const sql = 'SELECT * FROM images WHERE id = ?';
  db.query(sql, [imageId], (err, results) => {
      if (err) {
          console.error("Erreur lors de la récupération des données:", err);
          return res.status(500).send("Erreur lors de la récupération des données");
      }
      if (results.length > 0) {
          res.json(results[0]);  // Envoyer le premier résultat trouvé
      } else {
          res.status(404).send('Image non trouvée');
      }
  });
});

// Route pour obtenir les images par catégorie
app.get('/images/category/:category', (req, res) => {
  const category = req.params.category;
  const sql = 'SELECT * FROM images WHERE category = ? ORDER BY uploadDate DESC';
  db.query(sql, [category], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des images:', err);
      return res.status(500).send('Erreur lors de la récupération des images');
    }
    res.json(results);
  });
});



// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
