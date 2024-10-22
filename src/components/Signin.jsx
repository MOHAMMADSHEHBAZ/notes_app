import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login as authLogin } from "../store/authSlice";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import authService from "../appWrite/auth/auth";
import { useState } from "react";

const Signin = () => {
  const [error, setError] = React.useState("");
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/admin");
        toast.success("Login Successfully");
      }
    } catch (error) {
      setError(error.message);
      toast.error("Invalid credentials. Please check the email and password.");
    }
  };

  return (
    <>
      <Toaster/>
      <div className="flex items-center h-full">
        <form
          className="lg:max-w-md mx-auto w-5/6 lg:w-full m-8 bg-gray-50 p-8 rounded-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="text-2xl text-center">Signin</div>
          <p className="text-center mt-4 mb-5 text-gray-500 text-sm">
            {" "}
            Don&apos;t have any account?&nbsp;
            <Link
              to="/getstarted"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Signup
            </Link>
          </p>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-700 peer"
              placeholder=" "
              {...register("email", { required: "Required" })}
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
              {...register("password", { required: "Required" })}
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-red-700  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
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

export default Signin;
