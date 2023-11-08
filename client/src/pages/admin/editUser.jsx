import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; 
import axios from '../../axios';


const Modal = ({ isOpen, onClose, dataId }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(null);
    const [isLoading, setisLoading] = useState(false);
  
    const user = useSelector((state) => state.auth.allUsers);
    let selectedUser;
  console.log(dataId);

  const handleSave = () => {
    onClose();
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  useEffect(() => {
     selectedUser = user.find((user) => user._id === dataId);
    if (selectedUser) {
      setName(selectedUser.name);
      setEmail(selectedUser.email);
    }
  }, [dataId],user);
  
  
  const handleSubmit = async (e) => {
    

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    e.preventDefault();
    setisLoading(true);
    try{
        
        if (email && !emailRegex.test(email) ) {
            setError("Invalid Email Address");
            setShowError(true);
            return false;
        } else  {
            selectedUser = user.find((user) => user._id === dataId);
            const formData = new FormData();
                formData.append('name', name !== null ? name : user.name);
                formData.append('email', email !== null ? email : user.email);
                formData.append('image', image);
               
            axios.post(`/api/${selectedUser._id}/editProfile`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                  }
               
            }).then(response => {
              setisLoading(true)
                console.log(response.data.user);
                dispatch(
                    updateProfile(response.data.user)
                  );
                  setisLoading(false);
                  onClose();
            }).catch(error => {
                setError(error.response.data.error);
                setShowError(true);
                onClose();
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
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'visible' : 'invisible'}`}>
      <div className="modal-container bg-white w-96 p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Name: {user?.name}</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Email: {user.email}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Profile Photo URL</label>
          <input
           className="w-full border rounded py-2 px-3 mb-2"
           type="file"
           accept="image/*"
            onChange={handleImageChange}
            
          />
        </div>
        {
                    showError && <div class="p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                      <span class="font-medium">{error}</span>
                    </div>
                  }

              <p className="block mb-2 text-sm font-medium text-red-600 dark:text-red-600 text-center">
                  {isLoading ? 'Please Wait... ' : ''}
                </p>
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500 mr-4 hover:text-gray-700">Cancel</button>
          <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
