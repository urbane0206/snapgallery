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

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, IMAGES_FOLDER),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  const { titre, description } = req.body;
  res.json({ fileName: req.file.filename, titre, description });
});

app.get('/api/images', (req, res) => {
  fs.readdir(IMAGES_FOLDER, (err, files) => {
    if (err) return res.status(500).json({ error: 'Failed to read images directory' });
    res.json(files.filter(file => ['.png', '.jpg', '.jpeg', '.webp'].includes(path.extname(file))));
  });
});

app.get('/images/:filename', (req, res) => {
  res.sendFile(path.join(IMAGES_FOLDER, req.params.filename));
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
