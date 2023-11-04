import React from 'react'
import Signin  from './pages/user/signin'
import { Route, Routes } from "react-router-dom";
import Signup from './pages/user/signup';


const  App = () => {
  return (
    <>
    <Routes>
      <Route path='/login' element={< Signin />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
    
    </>
  )
}

export default App