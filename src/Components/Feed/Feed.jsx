import React, { useEffect, useState } from 'react';
import './Feed.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Feed = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:2001/api/images')
            .then(response => {
                setImages(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the images!", error);
            });
    }, []);

    return (
        <div className="feed">
            {images.map((image, index) => (
                <Link to={`Image/20/4521`} className='card' key={index}>
                    <img src={`http://localhost:2001/images/${image}`} alt="" />
                    <h2>Description Photo</h2>
                    <h3>Picture Owner</h3>
                    <p>15k views &bull; 2 days ago </p>
                </Link>
            ))}
        </div>
    );
}

export default Feed;


// ancien code
// import React from 'react'
// import './Feed.css'
// import thumbnail1 from '../../assets/thumbnail1.png'
// import thumbnail2 from '../../assets/thumbnail2.png'
// import thumbnail3 from '../../assets/thumbnail3.png'
// import thumbnail4 from '../../assets/thumbnail4.png'
// import thumbnail5 from '../../assets/thumbnail5.png'
// import thumbnail6 from '../../assets/thumbnail6.png'
// import thumbnail7 from '../../assets/thumbnail7.png'
// import thumbnail8 from '../../assets/thumbnail8.png'
// import { Link } from 'react-router-dom'
//
// const Feed = () => {
//   return (
//     <div className="feed">
//         <Link to={`Image/20/4521`} className='card'>
//             <img src={thumbnail1} alt="" />
//             <h2>Description Photo</h2>
//             <h3>Picture Owner</h3>
//             <p>15k views &bull; 2days ago </p>
//         </Link>
//         <div className='card'>
//             <img src={thumbnail2} alt="" />
//             <h2>Description Photo</h2>
//             <h3>Picture Owner</h3>
//             <p>15k views &bull; 2days ago </p>
//         </div>
//         <div className='card'>
//             <img src={thumbnail3} alt="" />
//             <h2>Description Photo</h2>
//             <h3>Picture Owner</h3>
//             <p>15k views &bull; 2days ago </p>
//         </div>
//         <div className='card'>
//             <img src={thumbnail4} alt="" />
//             <h2>Description Photo</h2>
//             <h3>Picture Owner</h3>
//             <p>15k views &bull; 2days ago </p>
//         </div>
//         <div className='card'>
//             <img src={thumbnail5} alt="" />
//             <h2>Description Photo</h2>
//             <h3>Picture Owner</h3>
//             <p>15k views &bull; 2days ago </p>
//         </div>
//         <div className='card'>
//             <img src={thumbnail6} alt="" />
//             <h2>Description Photo</h2>
//             <h3>Picture Owner</h3>
//             <p>15k views &bull; 2days ago </p>
//         </div>
//         <div className='card'>
//             <img src={thumbnail7} alt="" />
//             <h2>Description Photo</h2>
//             <h3>Picture Owner</h3>
//             <p>15k views &bull; 2days ago </p>
//         </div>
//         <div className='card'>
//             <img src={thumbnail8} alt="" />
//             <h2>Description Photo</h2>
//             <h3>Picture Owner</h3>
//             <p>15k views &bull; 2days ago </p>
//         </div>
//         <div className='card'>
//             <img src={thumbnail1} alt="" />
//             <h2>Description Photo</h2>
//             <h3>Picture Owner</h3>
//             <p>15k views &bull; 2days ago </p>
//         </div>
//         <div className='card'>
//             <img src={thumbnail2} alt="" />
//             <h2>Description Photo</h2>
//             <h3>Picture Owner</h3>
//             <p>15k views &bull; 2days ago </p>
//         </div>
//         <div className='card'>
//             <img src={thumbnail3} alt="" />
//             <h2>Description Photo</h2>
//             <h3>Picture Owner</h3>
//             <p>15k views &bull; 2days ago </p>
//         </div>
//         <div className='card'>
//             <img src={thumbnail4} alt="" />
//             <h2>Description Photo</h2>
//             <h3>Picture Owner</h3>
//             <p>15k views &bull; 2days ago </p>
//         </div>
//         <div className='card'>
//             <img src={thumbnail5} alt="" />
//             <h2>Description Photo</h2>
//             <h3>Picture Owner</h3>
//             <p>15k views &bull; 2days ago </p>
//         </div>
//         <div className='card'>
//             <img src={thumbnail6} alt="" />
//             <h2>Description Photo</h2>
//             <h3>Picture Owner</h3>
//             <p>15k views &bull; 2days ago </p>
//         </div>
//         <div className='card'>
//             <img src={thumbnail7} alt="" />
//             <h2>Description Photo</h2>
//             <h3>Picture Owner</h3>
//             <p>15k views &bull; 2days ago </p>
//         </div>
//         <div className='card'>
//             <img src={thumbnail8} alt="" />
//             <h2>Description Photo</h2>
//             <h3>Picture Owner</h3>
//             <p>15k views &bull; 2days ago </p>
//         </div>
//     </div>
//
//   )
// }
//
// export default Feed