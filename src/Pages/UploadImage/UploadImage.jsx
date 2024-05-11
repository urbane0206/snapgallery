import React, { useState, useRef, useCallback } from 'react';
import './UploadImage.css'; // Assurez-vous que le chemin est correct
import background from '../../assets/login-bg.png';

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false); // Nouvel état pour gérer le survol
  const fileInputRef = useRef(null);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    setIsDragOver(true); // Met à jour l'état lorsque un fichier est glissé sur la zone
  }, []);

  const handleDragLeave = useCallback((event) => {
    event.preventDefault();
    setIsDragOver(false); // Réinitialise l'état lorsque le fichier quitte la zone
  }, []);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setFile(event.dataTransfer.files[0]);
    }
    setIsDragOver(false); // Réinitialise l'état après le dépôt du fichier
  }, []);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (event) => {
    setFile(event.target.files[0]);
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
      const response = await fetch('http://localhost:2001/upload', {
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
          className={`upload__input-wrapper ${isDragOver ? 'drag-over' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
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
            {file && (
                <div class="image-preview">
                  <h3>Image sélectionnée :</h3>
                  <img src={URL.createObjectURL(file)} alt="Uploaded" class="uploaded-image" />
                </div>
            )}
          </label>
          <i className="ri-upload-cloud-2-fill"></i>
        </div>

        <div className='login__inputs'>
          <div className="login__box">
            <input 
                className="login__input"
                type="text" 
                name="titre"
                placeholder="Titre de l'image"
            />
          </div>
          <div className="login__box">
            <input 
                className="login__input"
                type="text" 
                name="description"
                placeholder="Description de l'image"
            />
          </div>
        </div>

        <button type="submit" className="upload__button">Upload</button>
      </form>
    </div>
  );
};



export default UploadImage;
