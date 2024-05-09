import express from 'express';
import multer from 'multer';
import path from 'path';
import cors from 'cors';

const app = express();
const port = 2001;

app.use(cors());

// Configuration de Multer pour gérer les fichiers uploadés
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Images/') // Le dossier où seront stockés les fichiers
  },
  filename: function (req, file, cb) {
    // Génération d'un nom de fichier unique
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

// Middleware pour servir les fichiers statiques dans le dossier "uploads"
app.use(express.static('uploads'));

// Route POST pour gérer l'upload du fichier
app.post('/upload', upload.single('file'), (req, res) => {
  // Récupération du titre et de la description envoyés dans le formulaire
  const title = req.body.titre;
  const description = req.body.description;

  // Renvoi d'une réponse JSON avec les informations sur l'image
  res.json({
    fileName: req.file.filename,
    title: title,
    description: description
  });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
