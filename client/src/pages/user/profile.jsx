import React from 'react'



const profile = () => {
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

    <div className="flex flex-col justify-center overlay z-50 items-center pb-10">
        <img className="w-44 h-44 mb-3 rounded-full shadow-lg" src="https://wallpapers.com/images/hd/iron-man-abstract-art-huwkamij9o3d3mt6.webp" alt="Bonnie image"/>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
        <div className="flex mt-4 space-x-3 md:mt-6">
            <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit Profile</a>
            <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Goback</a>
        </div>
    </div>
</div>

  
        

  
    
   </>
  )
}

export default profile