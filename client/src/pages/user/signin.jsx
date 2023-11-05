import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../axios';
import { setLogin } from '../../reduxStore/authSlice';
import { useDispatch } from "react-redux";

const signin = () => {
    const[email, setEmail] = useState(null);
    const[password, setPassword] = useState(null);
    const[error , setError] = useState(null);
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleSubmit = async(e) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        e.preventDefault();
        try{
            if (!emailRegex.test(email)) {
                setError("Invalid Email Address");
                setShowError(true);
                return false;
            } else if (!password || password === null || password === undefined) {
                setError("Invalid Password!");
                setShowError(true);
                return false;
            } else {
               
                axios.post('/login', {
                    email,
                    password,
                }).then(response => {
                    dispatch(
                        setLogin({
                          user: response.data.users,
                          token: response.data.token,
                        })
                      );
                    navigate('/')
                }).catch(error => {
                    setError(error.response.data.error);
                    setShowError(true);
                })
            }
        } catch (err) {
            console.log('catch block');
            console.error(err);
            setShowError(true);
            setError('Something went wrong');
        }
        };


  return (
    <>
    <div className='w-full min-h-screen font-bodyFont bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-600 text-white px-4 flex justify-center items-center'>
    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-200 ">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                  Sign-In
              </h1>
              <form onSubmit={handleSubmit} class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Your email</label>
                      <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" class="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-gray-100 dark:focus:border-gray-100" placeholder="Username" required=""/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Password</label>
                      <input onChange={(e) => setPassword(e.target.value)}  type="password" name="password" id="password" placeholder="Enter Your Password" class=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-gray-100 dark:focus:border-gray-100" required=""/>
                  </div>
                  
                  <div class="flex items-center justify-between">
                      <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-gray-700">Forgot password?</a>
                  </div>
                  {
                     showError && <div class="p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                  <span class="font-medium">{error}</span>
                                </div>
                     }
                  <button type="submit" className='w-full text-black bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>Sign in</button>
                  <p class="text-sm font-light text-gray-800 dark:text-gray-500">
                      Don’t have an account yet? <a href="/register" class="font-medium text-gray-600 hover:underline dark:text-gray-800">Sign up</a>
                  </p>
              </form>
          </div>
      </div>
    </div>
    </>
  )
}

export default signin;