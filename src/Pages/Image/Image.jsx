import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DisplayImage from '../../Components/DisplayImage/DisplayImage';
import Recommended from '../../Components/Recommended/Recommended';
import './Image.css'

const Image = () => {
  const { imageId } = useParams();
  const [imageDetails, setImageDetails] = useState(null);

  useEffect(() => {
    const fetchImageDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/images/${imageId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setImageDetails(data);
      } catch (error) {
        console.error('Failed to fetch image details:', error);
      }
    };

    fetchImageDetails();
  }, [imageId]);

  return (
    <div className='play-container' style={{ display: 'flex', flexDirection: 'row' }}>
      {imageDetails ? (
        <DisplayImage
          imageUrl={imageDetails.filePath}
          title={imageDetails.title}
          description={imageDetails.description}
          uploadDate={imageDetails.uploadDate}
          userId={imageDetails.userId}
        />
      ) : <p>Loading...</p>}
      <Recommended />
    </div>
  );
}

export default Image;
