import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../appWrite/auth/auth';
import { logout as LogOut } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const LogoutBtn = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logOut = () =>{
        authService.logout().then(()=>{
            navigate("/signin")
            dispatch(LogOut())
        })
    }

  return (
    <>
    <button onClick={logOut} title='Logout' className='bg-red-700 text-white text-center p-2 rounded-xl hover:bg-red-500'>
    Logout
    </button> 
    </>
  )
}

export default LogoutBtn
