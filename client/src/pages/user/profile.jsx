import { useState } from 'react'
import { useSelector  } from 'react-redux';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';

const profile = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
      };
      const goBack = () => {
        navigate('/')
    }


  return (
   <>
  <div className='bg-yellow-500 flex text-center justify-center w-full h-screen relative'>
   
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative mx-auto h-40 w-40 animate-bounce">
            <div className="mx-auto h-60 w-60 animate-pulse rounded-full border"></div>
            <span className="absolute flex h-5 w-5 animate-spin top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="h-4 w-4 rounded-full border"></span>
            </span>
        </div>
    </div>

    <div className="flex flex-col justify-center items-center pb-10 relative group">
  <div className="overlay z-50">
    <img className="w-44 h-44 mb-3 rounded-full shadow-lg transition duration-300 ease-in-out transform group-hover:scale-110"
         src={user?.picturePath || "https://wallpapers.com/images/hd/iron-man-abstract-art-huwkamij9o3d3mt6.webp"}
         alt="Bonnie image"
    />
    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user?.name}</h5>
    <span className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</span>
    <div className="flex mt-4 space-x-3 md:mt-6">
    
      <a href="#" onClick={toggleModal} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit Profile</a>
      <a href="#" onClick={goBack} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Go back</a>
    </div>
  </div>
</div>
</div>
<Modal isOpen={isModalOpen} onClose={toggleModal}/>
        
  
    
   </>
  )
}

export default profile