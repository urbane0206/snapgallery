import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Recommended.css';

const Recommanded = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:3000/images');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setImages(data.slice(0, 8)); 
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className='recommended'>
      {images.map((image, index) => (
        <div className="side-video-list" key={index}>
          <Link to={`/image/${image.id}`} className='card'>
            <img src={image.filePath} alt={image.title} />
            <div className="vid-info">
              <h4>{image.title}</h4>
              <p>{image.owner}</p>
              <p>{image.category}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Recommanded;
