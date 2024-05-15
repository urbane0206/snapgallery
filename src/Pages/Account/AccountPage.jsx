import React, { useState, useEffect } from 'react';
import { useNavigate, useResolvedPath } from 'react-router-dom';
import background from '../../assets/login-bg.png';
import userProfile from '../../assets/jack.png';

import "./AccountPage.css"

const AccountPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (isLoggedIn == false){
          const response = await fetch('http://localhost:2000/User-connected');
          const userData = await response.json();
          setUser(userData);
          setIsLoggedIn(true);
        }
      } catch (error) {
        navigate("/login")
      }
    };
    fetchUserData();
  }, []);

const handleLogout = async () => {
    try {
      await fetch('http://localhost:2000/parameter/account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userName: user.userName })
      });
      navigate("/login");
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
};

  return (
    <div className="login" style={{ backgroundImage: `url(${background})` }}>
      <form className="login__form">
        <div className='profile_icon_position'>
        <img src={userProfile} alt="Profile" className="user-icon" />
        </div>
        <br></br>
        <h1 className='login__title'>Profil</h1>
        <br></br>
        {user && (
          <div>
            <div className='login_box'>
              Connecté en tant que : {user.userName}
            </div>
            <br></br>
            <div className='login_box'>
              Mail  : { user.email}
            </div>
            <br></br>
            <div className='login_box'>
              Date de Création du Compte : { user.dateDeCreation }
            </div>
          </div>
        )}
        <br></br>
        <button className='login__button' onClick={handleLogout}>Se déconnecter</button>
      </form>
    </div>
  );
};

export default AccountPage;
