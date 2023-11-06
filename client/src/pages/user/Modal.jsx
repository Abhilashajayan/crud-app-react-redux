import { useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import axios from '../../axios';
import {updateProfile} from '../../reduxStore/authSlice.js'


const Modal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const [image, setImage] = useState(null);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(null);
    console.log(user._id);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
      };

   

    const handleSubmit = async (e) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        e.preventDefault();
        try{
            
            if (email && !emailRegex.test(email) ) {
                setError("Invalid Email Address");
                setShowError(true);
                return false;
            } else  {
               
                const formData = new FormData();
                    formData.append('name', name !== null ? name : user.name);
                    formData.append('email', email !== null ? email : user.email);
                    formData.append('image', image);
               
                axios.post(`/api/${user._id}/editProfile`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                      }
                   
                }).then(response => {
                    console.log(response.data.user);
                    dispatch(
                        updateProfile(response.data.user)
                      );
                      onClose();
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


    
  const modalClasses = isOpen ? 'fixed inset-0 flex items-center justify-center z-50' : 'hidden';

  return (
    <div className={modalClasses}>
      <div className="modal-overlay absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="modal-container bg-white w-96 mx-auto rounded shadow-lg z-50 p-6">
        <button className="modal-close absolute top-4 right-4 text-gray-700 hover:text-gray-900" onClick={onClose}>
          &times;
        </button>
        <h1 className="text-2xl mb-4">Edit User</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Image:</label>
          <input
            className="w-full border rounded py-2 px-3 mb-2"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name: {user?.name }</label>
          <input
            className="w-full border rounded py-2 px-3 mb-2"
            type="text"
            
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email: {user?.email }</label>
          <input
            className="w-full border rounded py-2 px-3 mb-2"
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {
                    showError && <div class="p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                      <span class="font-medium">{error}</span>
                    </div>
                  }
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mr-2"
         onClick={handleSubmit}
        >
          Confirm
        </button>
        <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
