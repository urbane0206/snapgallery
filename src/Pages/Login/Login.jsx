import React, { useState } from 'react';
import './Login.css'; 
import background from '../../assets/login-bg.png'; 
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [redirectToAccount, setRedirectToAccount] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { email, password };

    try {
      const response = await fetch('http://localhost:2000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.status === 401){
        setErrorMessage("Identifiants incorrects. Veuillez réessayer.");
      } else if (response.status === 200){
        const responseData = await response.json();
        navigate('/account');
      }
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire :', error);
    }
  };

  return (
    <div className="login" style={{ backgroundImage: `url(${background})` }}>
      <form onSubmit={handleSubmit} className="login__form">
        <h1 className="login__title">Login</h1>

        <div className="login__inputs">
          <div className="login__box">
            <input
              type="email"
              placeholder="Email ID"
              required
              className="login__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <i className="ri-mail-fill"></i>
          </div>

          <div className="login__box">
            <input
              type="password"
              placeholder="Password"
              required
              className="login__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="ri-lock-2-fill"></i>
          </div>
          <br></br>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}
        </div>}
        <div>
        {redirectToAccount && <Redirect to="/account" />}
        </div>
        
        <br></br>

        <div className="login__check">
          <div className="login__check-box">
            <input
              type="checkbox"
              className="login__check-input"
              id="user-check"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="user-check" className="login__check-label">Remember me</label>
          </div>

          <a href="#" className="login__forgot">Forgot Password?</a>
        </div>

        <button type="submit" className="login__button">Login</button>

        <div className="login__register">
          Don't have an account? <a href="#">Register</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
