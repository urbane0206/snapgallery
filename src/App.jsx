import React, { useState } from 'react';
import { Navbar } from './Components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Image from './Pages/Image/Image';
import UploadImage from './Pages/UploadImage/UploadImage';
import Login from './Pages/Login/Login';
import AccountPage from './Pages/Account/AccountPage';
import Inscription from './Pages/Inscription/Inscription';
import Category from './Pages/Category/Category';  
import PrivateRoute from './auth/PrivateRoute';
import { AuthProvider } from './auth/AuthContext';

const App = () => {
  const [sidebar, setSidebar] = useState(true);

  return (
    <AuthProvider>
      <div>
        <Navbar setSidebar={setSidebar} />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/inscription' element={<Inscription />} />
          <Route path='/' element={<PrivateRoute><Home sidebar={sidebar} /></PrivateRoute>} />
          <Route path='/image/:imageId' element={<PrivateRoute><Image /></PrivateRoute>} />
          <Route path='/UploadImage' element={<PrivateRoute><UploadImage /></PrivateRoute>} />
          <Route path='/account' element={<PrivateRoute><AccountPage /></PrivateRoute>} />
          <Route path='/category/:category' element={<PrivateRoute><Category /></PrivateRoute>} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
