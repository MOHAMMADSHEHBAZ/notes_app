import React, { useEffect } from "react";
import authService from "../appWrite/auth/auth";
import noteService from "../appWrite/auth/config";
import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { json } from "react-router-dom";
import Allnotes from "./Allnotes";
import Notes from "./Notes";
import PostCard from "./Card";

const GetNotes = () => {
  const [label, setLabel] = useState();
  const{register,handleSubmit,reset}=useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await authService.getCurrentUser();
        setLabel(user.labels);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, []);

  const submit= async(data)=>{
    try {
      const noteData = {
        name: data.name,
        file: data.file[0],
        description: data.description,
      };

      const result = await noteService.createNote(noteData);
      if (result) {
        toast.success("Note uploaded successfully!");
        reset();
      } else {
        toast.error("Failed to upload the note.");
      }
    } catch (error) {
      toast.error("An error occurred during submission.");
    }
  };

  const validateFileType = (file) => {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return validImageTypes.includes(file[0].type) || 
    toast.error("Only JPEG, PNG, or GIF formats are allowed");
  };
  const validateFileSize = (file) => {
      return file[0].size <= 812000 || 
      toast.error("File size should not exceed 500Kb");
  };

  const [notes,setNotes] = useState([]);
  useEffect(() => {}, [])
    noteService.getAllNotes([]).then((notes) => {
        if (notes) {
            setNotes(notes.documents);
        }
    })


  return (
    <div>
      {label == "admin" ? (
        <div className="flex items-center flex-col justify-center h-full p-20">
          <section class="lg:max-w-4xl min-w-80 p-6 mx-auto bg-gray-50 rounded-md shadow-md dark:bg-gray-800">
            <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">
            Hey! Admin You Can Upload Notes
            </h2>

            <form onSubmit={handleSubmit(submit)}>
              <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                  <label
                    class="text-gray-700 dark:text-gray-200"
                    for="username"
                  >
                    Name
                  </label>
                  <input
                    id="username"
                    type="text"
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 focus:ring-red-900 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    {
                      ...register('name',{required:"Required"})
                    }
                  />
                </div>

                <div>
                  <label
                    class="text-gray-700 dark:text-gray-200"
                    for="emailAddress"
                  >
                    File
                  </label>
                  <input
                    id="emailAddress"
                    type="file"
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
                    {...register("file", { required: "Required",validate: {
                      checkFileSize: validateFileSize,
                      checkFileType: validateFileType,
                    }, }    
                  )}
                 />
                </div>

              </div>
                <div>
                  <label
                    class="text-gray-700 dark:text-gray-200"
                    for="password"
                  >
                    Description 
                  </label>
                  <input
                    id="password"
                    type="text"
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 focus:ring-red-900 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    {
                      ...register('description',{required:"Required"})
                    }
                  />
                </div>

              <div class="flex justify-end mt-6">
                <button class="px-8 py-2.5 leading-5 font-thin text-white transition-colors duration-300 transform bg-red-900 hover:bg-red-800 rounded-lg">
                  Upload
                </button>
              </div>
            </form>
          </section>
          {/* <section className="w-full min-w-80 mt-12 p-6 mx-auto bg-gray-50 rounded-md shadow-md dark:bg-gray-800">
            <Allnotes/>
          </section> */}
          <div>
            <Notes/>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full p-20">
            {/* <section className="bg-gray-50 rounded-lg max-w-4xl shadow"> */}
            {notes.length>0 ?
            (<div className='flex flex-wrap mt-5'>
                {/* <Allnotes/> */}
                {notes.map((note) => (
                    <div key={note.$id} className='p-2 w-1/4'>
                        <PostCard {...note} />
                    </div>
                ))}
              </div>):
              (
                <div className='flex flex-wrap mt-5'>Loading...</div>
              )
            }
            {/* </section> */}
        </div>    
      )}
    </div>
  );
};

export default GetNotes;
