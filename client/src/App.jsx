import React from 'react'
import Signin  from './pages/user/signin'
import { Route, Routes } from "react-router-dom";
import Signup from './pages/user/signup';
import Home from './pages/user/home';

const  App = () => {
  return (
    <>
    <Routes>
      <Route path='/login' element={< Signin />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/' element={<Home />} />
    </Routes>
    
    </>
  )
}

export default App