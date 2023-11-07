import { useState , useEffect } from 'react'
import axios from '../../axios';
import { getUsers } from '../../reduxStore/authSlice';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminLogout } from '../../reduxStore/authSlice';


const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
    let users = useSelector(state => state.auth.allUsers) ;
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
    };
    
    if(searchTerm) {
      users = users.filter((item) => {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

      const handleDelete = async (userId) => {
        try {
          console.log(userId);
          await axios.delete(`/admin/delete/user/${userId}`);
          console.log('Item deleted successfully');
        } catch (error) {
          console.error('Error deleting item:', error);
        }
      };
      
     

    useEffect(() => {
      axios.get('/admin/getUsers').then(response => {
          dispatch(
              getUsers({
                  users: response.data.users
              })
          );
          navigate('/admin')
      }).catch(error => {
          setError(error.response.data.error || "something went wrong");
          setShowError(true);
      })
  }, [])
  const adminSubmit = () => {
    dispatch(
      adminLogout()
      )
      navigate('/admin/login');
  }
 
  return (
  <>
<nav class="bg-white border-gray-200 dark:bg-gray-500">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a class="flex items-center">
      <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Admin</span>
  </a>
  <div class="flex md:order-2">
    <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" >
      <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
      </svg>
      <span class="sr-only">Search</span>
    </button>
    <div class="relative hidden md:block">
      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span class="sr-only">Search icon</span>
      </div>
      <input type="text" id="search-navbar" onChange={handleSearch}  value={searchTerm}  class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..."/>
      
    </div>
    <button onClick={adminSubmit} className=' ml-5  text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700  '>Logout</button>
   
   
  </div>
  
  </div>
</nav>
        <div class="container my-12 py-12 mx-auto px-4 md:px-6 lg:px-12">
        
         

    <section class="mb-20 text-gray-800">

        <div class="block rounded-lg shadow-lg bg-white">
             <div class="flex flex-col">
                  <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                       <div class="inline-block min-w-full sm:px-6 lg:px-8">
                           <div class="overflow-hidden">
                              <table class="min-w-full mb-0">
                                 <thead class="border-b bg-gray-50 rounded-t-lg text-left">
                                  <tr>
                                  <th scope="col" class="rounded-tl-lg text-sm font-medium px-6 py-4">NAME</th>
                                  <th scope="col" class="text-sm font-medium px-6 py-4">Email</th>
                                  <th scope="col" class="text-sm font-medium px-6 py-4">STATUS</th>
                                <th scope="col" class="text-sm font-medium px-6 py-4">ROLE</th>
                                 <th scope="col" class="rounded-tr-lg text-sm font-medium px-6 py-4"></th>
                                 </tr>
                                  </thead>
                                <tbody>
                                {

                                }
                                 {users.map((user) => (
                                 <tr key={user?._id} class="border-b">
                                  <th scope="row" class="text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                 <div class="flex flex-row items-center">
                               <img
                        class="rounded-full w-12"
                        src={user?.picturePath}
                        alt="Avatar"
                      />
                      <div class="ml-4">
                        <p class="mb-0.5 font-medium">{user?.name}</p>
                       
                      </div>
                    </div>
                  </th>
                  <td class="text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                    <div class="flex flex-col">
                      <p class="mb-0.5">{user?.email}</p>
                     
                    </div>
                  </td>
                  <td class="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                    <span class="text-xs py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-medium bg-green-200 text-green-600 rounded-full">User</span>
                  </td>
                  <td class="align-middle text-gray-500 text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                  <a href="#!" class="font-medium text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 transition duration-300 ease-in-out">Edit</a>
                  </td>
                  <td class="align-middle text-right text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                    <a href="#!" onClick={() => handleDelete(user?._id)} class="font-medium text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 transition duration-300 ease-in-out">Delete</a>
                  </td>
                 
                </tr>
                
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</section>

</div>

    </>
  )
}

export default Home;