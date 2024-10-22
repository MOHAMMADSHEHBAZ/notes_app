import React, { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import authService from '../appWrite/auth/auth'
import profile from '../assets/profile.png'

const Admin = () => {

  const [name , setName] = React.useState("");

  useEffect(()=>{
    const getUser = async()=>{
      try{
        const name = await authService.getCurrentUser();
        setName(name);
      }
      catch(error){
        toast.error(error.message);
      }
    }
    getUser();
  },[])

  return (
    <>
    <Toaster/>
    <div className='flex items-center justify-center flex-col'>
    <div class="bg-gray-50 lg:w-3/6 w-5/6 p-6 rounded-lg shadow-lg text-center m-20 ">
    <h1 className='p-6 text-2xl font-light'>My Profile</h1>
    <div class="flex justify-center mb-4">
    <img class="w-24 h-24 rounded-full drop-shadow" src={profile} alt="Profile Picture"/>
    </div>
    <h1 class="text-gray-600">Name : {name.name}</h1>
    <p class="text-gray-600">Email : {name.email}</p>
    </div>
    </div>
    </>
  )
}

export default Admin

