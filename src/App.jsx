import React from 'react'
import { Navbar } from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Image from './Pages/Image/Image'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/image/:categoryId/:imageId' element={<Image/>} />
      </Routes>
    </div>
  )
}

export default App