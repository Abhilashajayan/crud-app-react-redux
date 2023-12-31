import React from 'react'
import Signin  from './pages/user/signin'
import { Route, Routes } from "react-router-dom";
import Signup from './pages/user/signup';
import Home from './pages/user/home';
import Profile from './pages/user/profile';
import Login from './pages/admin/Login';
import AdminHome from './pages/admin/Home';
import { useSelector } from 'react-redux';

const  App = () => {
  const token = useSelector(state => state.auth.token);
  const admin = useSelector(state => state.auth.admin);
  return (
    <>
    <Routes>
      <Route path='/login' element={token ? <Home/> : < Signin />  } />
      <Route path='/register' element={<Signup />} />
      <Route path='/profile' element={token ? <Profile /> : <Signin />} />
      <Route path='/' element={token ? <Home /> : <Signin />} />
      <Route path='/admin/login' element={<Login />} />
      <Route path='/admin' element={admin ? <AdminHome />  : <Login/> } />
    </Routes>
    
    </>
  )
}

export default App