import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.png'
import { useSelector } from 'react-redux';
import authService from '../appWrite/auth/auth';
import toast, { Toaster} from 'react-hot-toast';
import LogoutBtn from './LogoutBtn';

const Header = () => {

  const authStatus = useSelector((state)=> state.auth.status)

  const [name,setName] = useState("")
  
  const [isOpen, setIsOpen] = useState(false);

  useEffect(()=>{
    const user = async()=>{
      try{
        const userName = await authService.getCurrentUser();
        setName(userName.name);
      }
      catch(error){
        // toast.error(error.message);
      }
    }
    user();
  },[])

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow border-gray-200">
      <Toaster/>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {!authStatus ?
        (
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-10" alt="Flowbite Logo" />
        </Link>
        ):
        (
          <h1 className='text-xl drop-shadow text-red-900'>Welcome {name}</h1>
        )
        }
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {!authStatus ?
            (
            <Link
              to='signin'
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Get started
            </Link>
            ):
            (
              <LogoutBtn/>
            )
          }
          <button
            onClick={handleToggle}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded={isOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        </div>
        <div className={`items-center justify-between ${isOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-cta">
          {!authStatus ?
          (<ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink to='/' className={({isActive})=>`block py-4 text-lg font-thin px-3 md:p-0 ${isActive?"text-red-800 underline":"text-black"}`}>Home</NavLink>
            </li>
            <li>
              <NavLink disabled className="block py-4 text-lg font-thin px-3 md:p-0">About</NavLink>
            </li>
            <li>
              <NavLink to='/contact' className={({isActive})=>`block py-4 text-lg font-thin px-3 md:p-0 ${isActive?"text-red-800 underline":"text-black"}`}>Contact</NavLink>
            </li>
          </ul>):
          (
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink to='/MyNotes' className={({isActive})=>`block py-4 text-lg font-thin px-3 md:p-0 ${isActive?"text-red-800 underline":"text-black"}`}>Home</NavLink>
            </li>
            <li>
              <NavLink to='/profile' className={({isActive})=>`block py-4 text-lg font-thin px-3 md:p-0 ${isActive?"text-red-800 underline":"text-black"}`}>Profile</NavLink>
            </li>
          </ul>
          )
          }
        </div>
      </div>
    </nav>
  );
};

export default Header;
