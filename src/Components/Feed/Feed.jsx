import React, { useState, useEffect } from 'react';
import './Feed.css';
import { Link } from 'react-router-dom';

const Feed = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:3000/images');
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
  }, []);

  return (
    <div className="feed">
      {images.map((image, index) => (
        <Link to={`Image/${image.id}`} key={index} className='cardd'>
          <img src={image.filePath} alt={image.title} />
          <h2>{image.title}</h2>
          <h3>{image.userId} - {image.category}</h3>
          <p>Date: {new Date(image.uploadDate).toLocaleDateString()}</p>
        </Link>
      ))}
    </div>
  );
}

export default Feed;
