import { useState , useEffect } from 'react'
import Navbar from '../../components/Navbar';
import axios from '../../axios';
import { getUsers } from '../../reduxStore/authSlice';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const users = useSelector(state => state.auth.allUsers);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

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
 
  return (
    <>
    <Navbar />
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
                    <span class="text-xs py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-medium bg-green-200 text-green-600 rounded-full">Active</span>
                  </td>
                  <td class="align-middle text-gray-500 text-sm font-normal px-6 py-4 whitespace-nowrap text-left">User</td>
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