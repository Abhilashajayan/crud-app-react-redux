import React from 'react'
import Navbar from '../../components/Navbar'
import { useSelector } from 'react-redux';


const home = () => {
  const user = useSelector(state => state.auth.user);
  return (
    <>
       <Navbar />
        <div className='m-20'>
            <h1 className='text-black text-6xl justify-center flex'>Welcome <span>{user?.name} </span></h1>
        </div>

    </>
  )
}

export default home;