import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../../assets/login-bg.png';
import userProfile from '../../assets/jack.png';
import "./AccountPage.css";
import { useAuth } from '../../auth/AuthContext';

const AccountPage = () => {
  const navigate = useNavigate();
  const { user, setUser, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:2000/User-connected');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur :', error);
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [setUser, navigate]);

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      logout(); // Mise à jour de l'état global
      navigate("/login");
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="login" style={{ backgroundImage: `url(${background})` }}>
      <form className="login__form" onSubmit={handleLogout}>
        <div className='profile_icon_position'>
          <img src={userProfile} alt="Profile" className="user-icon" />
        </div>
        <br />
        <h1 className='login__title'>Profil</h1>
        <br />
        {user && (
          <div>
            <div className='login_box'>
              Connecté en tant que : {user.userName}
            </div>
            <br />
            <div className='login_box'>
              Mail  : {user.email}
            </div>
            <br />
            <div className='login_box'>
              Date de Création du Compte : {user.dateDeCreation}
            </div>
          </div>
        )}
        <br />
        <button className='login__button' type="submit" >Se déconnecter</button>
      </form>
    </div>
  );
};

export default AccountPage;
