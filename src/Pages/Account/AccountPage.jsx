import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./AccountPage.css"

const AccountPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:2000/User-connected');
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur :', error);
      }
    };

    fetchUserData();
  }, []); // Le tableau vide en second paramètre garantit que useEffect s'exécute uniquement une fois, après le rendu initial.

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
    <div className="account-page">
      <h1>Profil</h1>
      <br></br>
      {user && (
        <div>
          <p>Connecté en tant que : {user.userName}</p>
          <br></br>
          <p>Mail : { user.email}</p>
          <br></br>
          <p>Date de Création du Compte : { user.dateDeCreation }</p>
        </div>
      )}
      <br></br>
      <button onClick={handleLogout}>Se déconnecter</button>
    </div>
  );
};

export default AccountPage;
