import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Search.css';

const Search = () => {
  const [images, setImages] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`http://localhost:3000/search-images?q=${query}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Failed to fetch search results:', error);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  return (
    <div className='search-results'>
      <h1>Search Results</h1>
      <div className='grid-container'>
        {images.map((image, index) => (
          <div className="grid-item" key={index}>
            <Link to={`/image/${image.id}`} className='card'>
              <img src={image.filePath} alt={image.title} />
              <div className="image-info">
                <h2>{image.title}</h2>
                <p>{image.owner}</p>
                <p>{image.category}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
