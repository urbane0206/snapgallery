import React, { useState, useRef } from 'react';
import './UploadImage.css'; // Assurez-vous que le chemin est correct
import background from '../../assets/login-bg.png';
import { useAuth } from '../../auth/AuthContext'; // Importez le contexte d'authentification

const UploadImage = () => {
  const { user } = useAuth(); // Obtenez l'utilisateur connecté du contexte
  const [file, setFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(''); // État pour le message de confirmation
  const [formData, setFormData] = useState({
    titre: '',
    categorie: '', // Valeur par défaut vide ou une catégorie par défaut
    description: ''
  });
  const fileInputRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setUploadStatus('Please select a file to upload');
      return;
    }

    const data = new FormData();
    data.append('userId', user.id);
    data.append('title', formData.titre);
    data.append('category', formData.categorie);
    data.append('description', formData.description);
    data.append('file', file);

    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: data
      });

      if (response.ok) {
        setUploadStatus('Image ajoutée avec succès!');
        setTimeout(() => {
          window.location.reload(); 
        }, 200);
      } else {
        setUploadStatus('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadStatus('An error occurred while uploading the image');
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
            Drag and drop a file here or click to select a file
            {file && (
              <div className="image-preview">
                <h3>Selected Image:</h3>
                <img src={URL.createObjectURL(file)} alt="Uploaded" className="uploaded-image" />
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
                placeholder="Image Title"
                value={formData.titre}
                onChange={handleInputChange}
            />
          </div>
          <div className="login__box">
            <input 
                className="login__input"
                type="text" 
                name="description"
                placeholder="Image Description"
                value={formData.description}
                onChange={handleInputChange}
            />
          </div>
          <div className="login__box">
            <select 
                className="upload__select"
                name="categorie"
                value={formData.categorie}
                onChange={handleInputChange}
            >
              <option className="upload__option" value="">Select Category</option>
              <option className="upload__option" value="Home">Home</option>
              <option className="upload__option" value="Music">Music</option>
              <option className="upload__option" value="Gaming">Gaming</option>
              <option className="upload__option" value="Automobiles">Automobiles</option>
              <option className="upload__option" value="Sports">Sports</option>
              <option className="upload__option" value="Entertainment">Entertainment</option>
              <option className="upload__option" value="Technology">Technology</option>
              <option className="upload__option" value="Blogs">Blogs</option>
              <option className="upload__option" value="News">News</option>
            </select>
          </div>
        </div>

        <button type="submit" className="upload__button">Upload</button>

        {uploadStatus && <p className="upload__status">{uploadStatus}</p>}
      </form>
    </div>
  );
};

export default UploadImage;
