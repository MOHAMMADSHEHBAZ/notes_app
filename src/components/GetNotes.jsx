import React, { useEffect } from "react";
import authService from "../appWrite/auth/auth";
import { useState } from "react";
import toast from "react-hot-toast";

const GetNotes = () => {
  const [label, setLabel] = useState();

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

  return (
    <div>
      {label == "admin" ? (
        <div className="flex items-center justify-center h-full p-20">
          <section class="max-w-4xl p-6 mx-auto bg-gray-50 rounded-md shadow-md dark:bg-gray-800">
            <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">
            Hey! Admin You Can Upload Notes
            </h2>

            <form>
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
                  />
                </div>

              <div class="flex justify-end mt-6">
                <button class="px-8 py-2.5 leading-5 font-thin text-white transition-colors duration-300 transform bg-red-900 hover:bg-red-800 rounded-lg">
                  Upload
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full p-20">
            <section className="bg-gray-50 rounded-lg max-w-4xl shadow">
                <p className="px-52 py-28">Comming Soon</p>
            </section>
        </div>    
      )}
    </div>
  );
};

export default GetNotes;
