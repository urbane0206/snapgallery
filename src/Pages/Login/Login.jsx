import React, { useState } from 'react';
import './Login.css'; 
import background from '../../assets/login-bg.png'; 
import GitHub_logo from '../../assets/Github_logo.png';
import { Link } from 'react-router-dom';

const CLIENT_ID = "Ov23liNswSgnlEprdYqe";

const Login = () => {

  function loginWithGithub(event) {
    event.preventDefault();
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID);
  }
  
  

  return (
    <div className="login" style={{ backgroundImage: `url(${background})` }}>
      <form className="login__form">
        <h1 className="login__title">Login</h1>
        <button className="login__button" onClick={loginWithGithub}>
          <div className='login_logo_container'>
            <img className="login__logo" src={GitHub_logo} alt="" />
          </div>
          <span>
            Continue with GitHub
          </span>
        </button>

      </form>
    </div>
  );
};

export default Login;
