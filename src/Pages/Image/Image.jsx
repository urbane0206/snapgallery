import React from 'react';
import './Image.css';
import PlayVideo from '../../Components/PlayVideo/PlayVideo';
import Recommanded from '../../Components/Recommended/Recommended';


const Image = () => {
  return (
    <div className='play-container'>
        <PlayVideo/>
        <Recommanded/>
    </div>
  );
}

export default Image;
