import React, { useState } from 'react'
import { Navbar } from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Image from './Pages/Image/Image'
import UploadImage from './Pages/UploadImage/UploadImage'
import Login from './Pages/Login/Login'

const App = () => {

  const [sidebar,setSidebar] = useState(true);

  return (
    <div>
      <Navbar setSidebar={setSidebar}/>
      <Routes>
        <Route path='/' element={<Home sidebar={sidebar} />} />
        <Route path='/image/:categoryId/:imageId' element={<Image/>} />
        <Route path='/UploadImage' element={<UploadImage />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App