import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 2001;
const IMAGES_FOLDER = path.join(__dirname, 'Images');

app.use(cors());

// Configuration de Multer pour gérer les fichiers uploadés
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, IMAGES_FOLDER) // Le dossier où seront stockés les fichiers
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

// Route GET pour récupérer la liste des images
app.get('/api/images', (req, res) => {
  fs.readdir(IMAGES_FOLDER, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read images directory' });
    }
    const images = files.filter(file => file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.webp'));
    res.json(images);
  });
});

// Route GET pour servir les fichiers image
app.get('/images/:filename', (req, res) => {
  const filePath = path.join(IMAGES_FOLDER, req.params.filename);
  res.sendFile(filePath);
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});




// Ancien code
// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import cors from 'cors';
//
// const app = express();
// const port = 2001;
//
// app.use(cors());
//
// // Configuration de Multer pour gérer les fichiers uploadés
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'Images/') // Le dossier où seront stockés les fichiers
//   },
//   filename: function (req, file, cb) {
//     // Génération d'un nom de fichier unique
//     cb(null, Date.now() + path.extname(file.originalname))
//   }
// });
//
// const upload = multer({ storage: storage });
//
// // Middleware pour servir les fichiers statiques dans le dossier "uploads"
// app.use(express.static('uploads'));
//
// // Route POST pour gérer l'upload du fichier
// app.post('/upload', upload.single('file'), (req, res) => {
//   // Récupération du titre et de la description envoyés dans le formulaire
//   const title = req.body.titre;
//   const description = req.body.description;
//
//   // Renvoi d'une réponse JSON avec les informations sur l'image
//   res.json({
//     fileName: req.file.filename,
//     title: title,
//     description: description
//   });
// });
//
// // Démarrage du serveur
// app.listen(port, () => {
//   console.log(`Serveur lancé sur http://localhost:${port}`);
// });
