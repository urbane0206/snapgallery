import React from 'react';
import './Image.css';
import DisplayImage from '../../Components/DisplayImage/DisplayImage';
import Recommanded from '../../Components/Recommended/Recommended';


const Image = () => {
  return (
    <div className='play-container'>
        <DisplayImage/>
        <Recommanded/>
    </div>
  );
}

export default Image;
