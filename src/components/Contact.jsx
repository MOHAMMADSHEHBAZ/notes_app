import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster,toast } from "react-hot-toast";
import '../App.css';
import noteService from "../appWrite/auth/config";

const Contact = () => {

  const{register,handleSubmit,reset}=useForm();
  const[error,setError] = useState("");

  const onSubmit=async(data)=>{
    setError("");
    try{
      const feedback = await noteService.contactUs(data);
      if(feedback){
        toast.success("Thank you for your feedback!")
        reset();
      }
    }
    catch(error){
      setError(error.message)
      toast.error(error.message)
      throw(error.message)
    }
  }

  return (
    <>
      <Toaster/>
      <div>
        <div className="flex items-center flex-col justify-center text-3xl p-10">
          <div className=" mt-5 bg-gray-50 rounded-lg p-8 w-6/12">
          <h1 className="text-center mb-5">Contact Us</h1>
            <form className="mb-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded focus:outline-none focus:ring-red-800 focus:border-red-800 block w-full p-2.5"
                  placeholder="Enter Your Email"
                  {
                    ...register('email',{required:"Required"})
                  }
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="subject"
                  className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded focus:outline-none focus:ring-red-800 focus:border-red-800  block w-full p-2.5"
                  placeholder="Let us know how we can help you"
                  {
                    ...register('subject',{required:"Required"})
                  }
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
                >
                  Your message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded border focus:outline-none border-gray-300 focus:ring-red-800 focus:border-red-800 "
                  placeholder="Your message..."
                  {
                    ...register('message',{required:"Required"})
                  }
                ></textarea>
              </div>
              <button
                type="submit"
                className="text-white bg-red-800 hover:bg-red-900 w-full focus:ring-4 focus:ring-red-500 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 focus:outline-none block"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
