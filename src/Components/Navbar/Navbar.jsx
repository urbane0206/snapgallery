import React, { useState } from 'react';
import './Navbar.css'
import menu_icon from '../../assets/menu.png'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search.png'
import upload_icon from '../../assets/upload.png'
import more_icon from '../../assets/more.png'
import notification_icon from '../../assets/notification.png'
import profile_icon from '../../assets/jack.png'
import {Link , useNavigate } from "react-router-dom"



export const Navbar = ({setSidebar}) => {

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleProfileIconClick = () => {
    // Effectue la requête Fetch pour vérifier l'authentification
    fetch('http://localhost:2000/User-connected')
      .then(async response => {
        if (response.ok) {
          try {
            const data = await response.json();
            setIsLoggedIn(true); // Met à jour l'état de connexion
            navigate("/account");
          } catch {
            setIsLoggedIn(false); // Met à jour l'état de connexion
            navigate("/login");
          }
        }
      });
  };


  return (
    <nav className='flex-div'>
        <div className='nav-left flex-div'>
            <img className='menu-icon' onClick={()=>setSidebar(prev=>prev===false?true:false)} src={menu_icon} alt="" />
            <Link to="/">
              <img className='logo' src={logo} alt="" />
            </Link>
        </div>

        <div className='nav-middle flex-div'>
            <div className='search-box flex-div'>
                <input type="text" placeholder='Search' />
                <img src={search_icon} alt="" />
            </div>
        </div>

        <div className='nav-right flex-div'>
           <Link to="/UploadImage">
              <img src={upload_icon} alt="" />
           </Link>
           <img src={more_icon} alt="" />
           <img src={notification_icon} alt="" />
           <Link to="/login">
            <img src={profile_icon} className='user-icon' alt="" onClick={handleProfileIconClick}/> 
           </Link>
           
        </div>
    </nav>
  )
}