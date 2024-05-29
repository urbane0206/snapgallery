import React, { useState } from 'react';
import './Navbar.css';
import menu_icon from '../../assets/menu.png';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search.png';
import upload_icon from '../../assets/upload.png';
import more_icon from '../../assets/more.png';
import notification_icon from '../../assets/notification.png';
import profile_icon from '../../assets/jack.png';
import { Link, useNavigate } from "react-router-dom";

export const Navbar = ({ setSidebar }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleProfileIconClick = () => {
    fetch('http://localhost:2000/User-connected')
      .then(async response => {
        if (response.ok) {
          try {
            const data = await response.json();
            setIsLoggedIn(true);
            navigate("/account");
          } catch {
            setIsLoggedIn(false);
            navigate("/login");
          }
        }
      });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchTerm}`);
  };

  return (
    <nav className='flex-div'>
      <div className='nav-left flex-div'>
        <img className='menu-icon' onClick={() => setSidebar(prev => prev === false ? true : false)} src={menu_icon} alt="" />
        <Link to="/">
          <img className='logo' src={logo} alt="" />
        </Link>
      </div>

      <div className='nav-middle flex-div'>
        <form className='search-box flex-div' onSubmit={handleSearchSubmit}>
          <input 
            type="text" 
            placeholder='Search' 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <button type="submit">
            <img src={search_icon} alt="" />
          </button>
        </form>
      </div>

      <div className='nav-right flex-div'>
        <Link to="/UploadImage">
          <img src={upload_icon} alt="" />
        </Link>
        <img src={more_icon} alt="" />
        <img src={notification_icon} alt="" />
        <Link to="/login">
          <img src={profile_icon} className='user-icon' alt="" onClick={handleProfileIconClick} />
        </Link>
      </div>
    </nav>
  );
};
