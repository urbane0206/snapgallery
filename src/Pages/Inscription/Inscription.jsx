import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Inscription.css';

function Inscription() {
  const navigate = useNavigate(); 

  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [dateDeNaissance, setDateDeNaissance] = useState('');

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email && userName && password && nom && prenom && dateNaissance) {
      const data  = { userName , password , nom , prenom , dateDeNaissance ,email }
      const response = await fetch('http://localhost:2000/login/create-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if(response.ok){
        navigate("/account")
      }
    } else {
      alert("Veuillez remplir tous les champs requis !");
    }
  };

  return (
    <div className="Inscription">
      <h2 className="Inscription__title">Inscription</h2>
      <form className="Inscription__form" onSubmit={handleSubmit}>
        <div className="Inscription__inputs">
          <label htmlFor="email">Email:</label>
          <input
            className="Inscription__input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="Inscription__inputs">
          <label htmlFor="pseudo">Pseudo:</label>
          <input
            className="Inscription__input"
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="Inscription__inputs">
          <label htmlFor="password">Mot de passe:</label>
          <input
            className="Inscription__input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="Inscription__inputs">
          <label htmlFor="nom">Nom:</label>
          <input
            className="Inscription__input"
            type="text"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>
        <div className="Inscription__inputs">
          <label htmlFor="prenom">Prénom:</label>
          <input
            className="Inscription__input"
            type="text"
            id="prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
          />
        </div>
        <div className="Inscription__inputs">
          <label htmlFor="dateNaissance">Date de naissance:</label>
          <input
            className="Inscription__input"
            type="date"
            id="dateNaissance"
            value={dateDeNaissance}
            onChange={(e) => setDateDeNaissance(e.target.value)}
            required
          />
        </div>
        <button className="Inscription__button" type="submit">S'inscrire</button>
      </form>
    </div>
  );
}

export default Inscription;
