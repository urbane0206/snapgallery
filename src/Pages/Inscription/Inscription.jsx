import React, { useState } from 'react';
import './Inscription.css';
import background from '../../assets/login-bg.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Inscription = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUsername] = useState('');
    const [nom, setFirstName] = useState('');
    const [prenom, setLastName] = useState('');
    const [dateDeNaissance, setDateOfBirth] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = { userName , password , nom , prenom , dateDeNaissance ,email };
        try {
            const response = await fetch('http://localhost:2000/login/create-account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok){
                navigate("/account")
            } 
        } catch (error) {
            console.error("Erreur lors de l'inscription :", error);
        }
    };

    return (
        <div className="login" style={{ backgroundImage: `url(${background})` }}>
            <form onSubmit={handleSubmit} className="login__form">
                <h1 className="login__title">Inscription</h1>
                <div className="login__inputs">
                    {/* Ajout des différents champs requis pour l'inscription */}
                    <div className="login__box">
                        <input type="email" placeholder="Email" required className="login__input" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <i className="ri-mail-fill"></i>
                    </div>
                    <div className="login__box">
                        <input type="password" placeholder="Mot de passe" required className="login__input" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <i className="ri-lock-2-fill"></i>
                    </div>
                    <div className="login__box">
                        <input type="text" placeholder="Pseudo" required className="login__input" value={userName} onChange={(e) => setUsername(e.target.value)} />
                        <i className="ri-user-3-fill"></i>
                    </div>
                    <div className="login__box">
                        <input type="text" placeholder="Nom" required className="login__input" value={prenom} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className="login__box">
                        <input type="text" placeholder="Prénom" required className="login__input" value={nom} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="login__box">
                        <input type="date" placeholder="Date de naissance" required className="login__input" value={dateDeNaissance} onChange={(e) => setDateOfBirth(e.target.value)} />
                    </div>
                </div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <button type="submit" className="login__button">S'inscrire</button>
            </form>
        </div>
    );
};

export default Inscription;