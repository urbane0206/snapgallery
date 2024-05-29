import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Category.css';

const Category = () => {
  const { category } = useParams();
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`http://localhost:3000/images/category/${category}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };

    fetchImages();
  }, [category]);

  return (
    <div className='category-feed'>
      <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
      <div className="grid-container">
        {images.length > 0 ? (
          images.map((image, index) => (
            <Link to={`/image/${image.id}`} key={index} className='grid-item'>
              <img src={image.filePath} alt={image.title} />
              <div className="image-info">
                <h2>{image.title}</h2>
                <p>{image.description}</p>
                <p>{image.owner}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>Pas d'image a afficher.</p>
        )}
      </div>
    </div>
  );
}

export default Category;
