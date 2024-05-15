import React, { useState } from 'react';
import './Login.css'; 
import background from '../../assets/login-bg.png'; 
import GitHub_logo from '../../assets/Github_logo.png';
import { default as axios } from 'axios';
import { Link ,useNavigate } from 'react-router-dom';

const CLIENT_ID = "Ov23likhB2rCIFONu2Wq";
const CLIENT_SECRET = "712c6b35b179fdfaa3a69dea563d97f1b4bf4498"
const REDIRECT_URI = "http://localhost:5173/login"

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


  const loginWithGithub = (event) => {
    event.preventDefault();
    window.location.assign(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`);
  };


  const connectByGithub = async (compte) => {
    const { mail, login } = compte;
    try {
      const response = await axios.post('http://localhost:2000/connect-by-github', { mail, userName: login });
      if (response.status === 200) {
        navigate("/account");
      } else {
        console.error("Erreur:", response.status);
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
    }
  };

  const getUserInfoFromGitHub = async (accessToken) => {
    const token = accessToken.split("=")[1].split("&")[0];
    try {
      const response = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const userInfo = await response.json();
        console.log("Informations utilisateur:", userInfo);
        // Si les informations utilisateur sont obtenues avec succès, appelle connectByGithub
        if (userInfo) {
          await connectByGithub(userInfo);
        }
      } else {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur.');
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
    }
  };

  const recupToken = async (code) => {
    try {
      const response = await axios.post('http://localhost:2000/get-Token', {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        redirect_uri: REDIRECT_URI,
      });
      if (response.status === 200) {
        await getUserInfoFromGitHub(response.data);
      } else {
        console.error("Erreur lors de la récupération du token:", response.status);
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
    }
  };

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      console.log("Code d'authentification:", code);
      recupToken(code);
    }
  }, []);


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
        <button className="login__button" onClick={loginWithGithub}>
          <div className='login_logo_container'>
            <img className="login__logo" src={GitHub_logo} alt="" />
          </div>
          <span>
            Continue with GitHub
          </span>
        </button>
        <div className="login__register">
          Don't have an account? <Link to="/Inscription">Registerr</Link>
        </div>
      </form>


    </div>
  );
};

export default Login;
