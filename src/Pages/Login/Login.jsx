import './Login.css';
import React, { useState } from 'react';

const Login = () => {
  // Définir les états pour stocker le pseudo et le mot de passe
  const [pseudo, setPseudo] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Créer un objet avec les données à envoyer au backend
    const data = {
      userName : pseudo ,
      password : motDePasse
    };

    console.info(data)


    try {
      // Envoyer les données au backend via une requête POST
      const response = await fetch('http://localhost:2000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: (data)
      });

      // Traiter la réponse du backend
      const responseData = await response.json();
      console.log(responseData); // Afficher la réponse du backend
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire :', error);
    }
  };

  return (
    <div>
      <div id="formulaire">
        <h2>Connectez-vous</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <label htmlFor="pseudo">Pseudo</label>
          <input
            type="text"
            id="pseudo"
            value={pseudo}
            onChange={(event) => setPseudo(event.target.value)}
          />

          <label htmlFor="motDePasse">Mot de passe</label>
          <input
            type="password"
            id="motDePasse"
            value={motDePasse}
            onChange={(event) => setMotDePasse(event.target.value)}
          />

          <input type="submit" value="Se connecter" />

          <p>
            Vous n'avez pas de compte ? <a href="#">Créer un compte</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
