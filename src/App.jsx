import React, { useState } from 'react'
import { Navbar } from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Image from './Pages/Image/Image'
import Upload_Image from './Pages/Upload_Image/Upload_Image'

const App = () => {

  const [sidebar,setSidebar] = useState(true);

  return (
    <div>
      <Navbar setSidebar={setSidebar}/>
      <Routes>
        <Route path='/' element={<Home sidebar={sidebar} />} />
        <Route path='/image/:categoryId/:imageId' element={<Image/>} />
        <Route path='/Upload_Image' Component={Upload_Image}></Route>
      </Routes>
    </div>
  )
}

export default App