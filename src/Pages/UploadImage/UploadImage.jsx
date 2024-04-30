import React, { useState, useRef, useCallback } from 'react';
import './UploadImage.css';
import background from '../../assets/login-bg.png';

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null); // Crée une référence pour l'input file

  const handleDragOver = useCallback((event) => {
    event.preventDefault(); // Nécessaire pour permettre le drop
  }, []);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setFile(event.dataTransfer.files[0]);
    }
  }, []);

  const handleClick = () => {
    fileInputRef.current.click(); // Déclenche le clic sur l'input file
  };

  const handleChange = (event) => {
    setFile(event.target.files[0]); // Met à jour le fichier sélectionné
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("Veuillez sélectionner un fichier à uploader ou glissez un fichier ici.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch('http://localhost:2000/upload', {
        method: 'POST',
        body: formData,
      });
      const responseData = await response.json();
      console.log(responseData);
      alert("Fichier uploadé avec succès!");
    } catch (error) {
      console.error('Erreur lors de l\'upload du fichier :', error);
    }
  };

  return (
    <div className="upload" style={{ backgroundImage: `url(${background})` }}>
      <form onSubmit={handleSubmit} className="upload__form">
        <h1 className="upload__title">Upload File</h1>

        <div 
          className="upload__input-wrapper"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleClick} 
        >
          <input
            type="file"
            ref={fileInputRef} 
            className="upload__input"
            onChange={handleChange}
            style={{ display: 'none' }} 
          />
          <label htmlFor="file-upload" className="upload__drag-area">
            Glissez et déposez un fichier ici ou cliquez pour sélectionner un fichier
          </label>
          <i className="ri-upload-cloud-2-fill"></i>
        </div>

        <button type="submit" className="upload__button">Upload</button>
      </form>
    </div>
  );
};

export default UploadImage;
