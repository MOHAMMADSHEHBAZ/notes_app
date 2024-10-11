import React,{useState} from "react";
import { Link ,useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../store/authSlice";
import authService from "../appWrite/auth/auth";
import { useDispatch } from 'react-redux'
import { Toaster,toast } from "react-hot-toast";

const Getstated = () => {

  const{register,handleSubmit, reset}= useForm();
  const [error,setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const create=async(data)=>{
    setError("");
    try{
      const userData = await authService.createAccount(data);
      if(userData){
        if(userData) dispatch(login(userData));
        navigate("/admin")
        toast.success("Account Created Successfully")
        reset();
      }
    }
    catch(error){
      setError(error.message)
      toast.error("User Already Exist")
      throw(error.message)
    }
  }

  // const onSubmit=(data)=>{
  //     alert(JSON.stringify(data));
  // }

  return (
    <>
      <div className="flex items-center h-full">
        <Toaster/>
        <form className="max-w-md mx-auto w-full m-8 bg-gray-50 p-8 rounded-lg" onSubmit={handleSubmit(create)}>
          <div className="text-2xl text-center">Signup</div>
          <p className="text-center mt-4 mb-5 text-gray-500 text-sm">
            {" "}
            Already have an account?&nbsp;
          <Link
            to="/signin"
            className="font-medium text-primary transition-all duration-200 hover:underline"
            >
            SignIn
          </Link>
        </p>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-700 peer"
              placeholder=" "
              {
                ...register("email",{required:"Required"})
              }
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-red-700  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="floating_password"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-700 peer"
              placeholder=" "
              {
                ...register("password",{required:"Required"})
              }
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-red-700  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>
          
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="floating_first_name"
                id="floating_first_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-700 peer"
                placeholder=" "
                {
                  ...register("name",{required:"Required"})
                }
              />
              <label
                htmlFor="floating_first_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-700  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter Name
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="tel"
                pattern="[6-9][0-9]{9}"
                name="floating_phone"
                id="floating_phone"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-red-700 peer"
                placeholder=" "
                {
                  ...register("phone",{required:"Required"})
                }
              />
              <label
                htmlFor="floating_phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-700  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone number
              </label>
            </div>

          <button
            type="submit"
            className="text-white bg-red-900 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:hover:bg-red-700"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Getstated;
