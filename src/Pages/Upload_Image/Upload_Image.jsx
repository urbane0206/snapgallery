import React, { useState } from 'react'
import './Upload_Image.css'

function Upload_Image() {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Ajoutez ici la logique pour envoyer l'image au serveur
    console.log('Image uploaded:', image);
    // Réinitialiser l'état de l'image après l'envoi
    setImage(null);
  };

  return (
    <div class="upload-container">
  <h2>Uploader une image</h2>
  <form onSubmit={handleSubmit} class="upload-form">
    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      class="upload-input"
    />
    <button type="submit" class="upload-button">Envoyer</button>
  </form>
  {image && (
    <div class="image-preview">
      <h3>Image sélectionnée :</h3>
      <img src={URL.createObjectURL(image)} alt="Uploaded" class="uploaded-image" />
    </div>
  )}
</div>

  );
}

export default Upload_Image;
