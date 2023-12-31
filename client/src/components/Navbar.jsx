import React from 'react'
import { useDispatch } from "react-redux";
import { setLogout } from '../reduxStore/authSlice';
import { CgProfile } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const handleSubmit = () =>{
    navigate( '/profile');
  }

  const handleLogout = () => {
    dispatch(
      setLogout()
      )
      navigate('/');
  }
  return (
    <>
        <nav class="bg-white dark:bg-yellow-300 bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-500 fixed w-full z-20 top-0 left-0 border-b border-gray-100 dark:border-gray-100">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a  class="flex items-center">
                     <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Crud App</span>
                </a>
            <div class="flex md:order-2">
                 <button onClick={handleLogout} type="button" class="text-white bg-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</button>
                  
             </div>
             <div class="flex ms-auto mr-6">
             <button onClick={handleSubmit}> <CgProfile className='h-6 w-6' /> </button>
             </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar