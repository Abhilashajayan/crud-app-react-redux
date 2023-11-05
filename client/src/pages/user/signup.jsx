import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios  from '../../axios';




const signup = () => {
const navigate = useNavigate();
const[name,setName] = useState(null);
const[password,setPassword] = useState(null);
const[email,setEmail] = useState(null);
const[error, setError] = useState(null);
const[showError, setShowError] = useState(null);


const handleSubmit = async (e) => {
    const stringRegex = /^[a-zA-Z0-9_.\s-]{3,}$/
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const passwordRegex = /^[^\s]{6,}$/
    e.preventDefault();
    try {
        if (!stringRegex.test(name)) {
            setError("Invalid Fullname");
            setShowError(true);
            return false;
        } else if (!emailRegex.test(email)) {
            setError("Invalid Email Address");
            setShowError(true);
            return false;
        } else if (!passwordRegex.test(password)) {
            setError("Invalid Password! Make a strong password");
            setShowError(true);
            return false;
        } else {
            axios.post('/register', {
                name,
                email,
                password,
            }).then(response => {
                navigate('/login')
            }).catch(error => {
                setError(error.response.data.error);
                setShowError(true);
            })
        }
    } catch (err) {
        console.error(err);
        setShowError(true);
        setError('Something went wrong');
    }
} ;

  return (
    <>
         <div className='w-full min-h-screen font-bodyFont bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-600 text-white px-4 flex justify-center items-center'>
         <div class="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-200 ">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                  Sign-Up
              </h1>
              <form onSubmit={handleSubmit}  class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Username</label>
                      <input onChange={(e) => setName(e.target.value)} type="text" name="username" id="email" class="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-gray-100 dark:focus:border-gray-100" placeholder="Username" required=""/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Email</label>
                      <input onChange={(e) => setEmail(e.target.value)} type="email" name="Email" id="password" placeholder="Enter Your Email" class=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-gray-100 dark:focus:border-gray-100" required=""/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Password</label>
                      <input onChange={(e) => setPassword(e.target.value)}  type="" name="password" id="password" placeholder="Enter Your Password" class=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-gray-100 dark:focus:border-gray-100" required=""/>
                  </div>
                  {
                     showError && <div class="p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                  <span class="font-medium">{error}</span>
                                </div>
                     }
                  <div class="flex items-center justify-between">
                      <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-gray-700">Forgot password?</a>
                  </div>
                  <button type="submit" className='w-full text-black bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>Sign Up</button>
                  <p class="text-sm font-light text-gray-800 dark:text-gray-500">
                      Don’t have an account yet? <a href="/login" class="font-medium text-gray-600 hover:underline dark:text-gray-800">Sign In</a>
                  </p>
              </form>
          </div>
      </div>

         </div>
    </>
  )
}

export default signup