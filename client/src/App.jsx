import React from 'react'
import Signin  from './pages/user/signin'
import { Route, Routes } from "react-router-dom";
import Signup from './pages/user/signup';
import Home from './pages/user/home';
import Profile from './pages/user/profile';
import Login from './pages/admin/Login';
import AdminHome from './pages/admin/Home';


const  App = () => {
  return (
    <>
    <Routes>
      <Route path='/login' element={< Signin />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/' element={<Home />} />
      <Route path='/admin/login' element={<Login />} />
      <Route path='/admin/Home' element={<AdminHome />} />
    </Routes>
    
    </>
  )
}

export default App