import React, { useEffect, useState } from 'react';
import noteService from '../appWrite/auth/config';
import { Toaster,toast } from 'react-hot-toast';
import authService from '../appWrite/auth/auth';
import '../App.css'
const Notes = () => {

    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const data = await noteService.getAllNotes();
                console.log(data);
                if (Array.isArray(data.documents)) {
                    setNotes(data.documents);
                } else {
                    console.error('Fetched data is not an array:', data);
                }
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };
        fetchNotes();
    }, []);

    const [visibleImage, setVisibleImage] = useState({});

    const toggleImageVisibility = (fileId) => {
        setVisibleImage(prev => ({
            ...prev,
            [fileId]: !prev[fileId]
        }));
    };

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


    const handleDelete = async (noteId) => {
      const confirmed = window.confirm("Are you sure you want to delete this note?");
      if (confirmed) {
          const isDeleted = await noteService.deleteNote(noteId);
          if (isDeleted) {
              setNotes((prevNotes) => prevNotes.filter(note => note.$id !== noteId));
              toast.success("Note deleted successfully!");
          } else {
              toast.success("Failed to delete the note.");
          }
      }
  };

  const handleDownload = async (noteId) => {
    const fileUrl = await noteService.downloadNote(noteId);
    if (fileUrl) {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = ''; // This ensures the browser treats it as a download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert("Failed to download the file.");
    }
};

const [imageUrls, setImageUrls] = useState({});

    useEffect(() => {
        const fetchImageUrls = async () => {
            const urls = {};
            for (const note of notes) {
                const url = await noteService.getFilePreview(note.fileId);
                if (url) {
                    urls[note.fileId] = url; // Store the URL in the state
                }
            }
            setImageUrls(urls);
        };

        fetchImageUrls();
    }, [notes]);

  return (
    <section class="container px-4 mt-8 mx-auto">
    <div class="flex items-center gap-x-3">
        <h2 class="text-lg font-medium text-gray-800 dark:text-white">Uploaded Notes</h2>
    </div>

    <div class="mt-6">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table class="lg:min-w-96 width min-w-80 divide-y divide-gray-200 dark:divide-gray-700">
                        <thead class="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <div class="flex items-center gap-x-3">
                                        <span>Name</span>
                                    </div>
                                </th>

                                {/* <th scope="col" class="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <button class="flex items-center gap-x-2">
                                        <span>Description</span>

                                        <svg class="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                            <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                            <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" stroke-width="0.3" />
                                        </svg>
                                    </button>
                                </th> */}

                                <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <button class="flex items-center gap-x-2">
                                        <span>File</span>

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                        </svg>
                                    </button>
                                </th>
                                {label == "admin" &&(
                                <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Action</th>
                                )
                                }
                            </tr>
                        </thead>
                        {Array.isArray(notes) && notes.length > 0 ? (
                        <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                            {notes.map((note) => (
                            <tr key={note.$id}>
                                <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                    <div class="inline-flex items-center gap-x-3">
                                        

                                        <div class="flex items-center gap-x-2">
                                            <div>
                                                <h2 class="font-medium text-gray-800 dark:text-white ">{note.name}</h2>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                {/* <td class="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                    <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 dark:bg-gray-800">
                                        
                                        <h2 class="text-sm font-normal">{note.description}</h2>
                                    </div>
                                </td> */}
                                
                                <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"><img
                                        src={noteService.getFilePreview(note.fileId)} 
                                        alt={note.name}
                                        className="rounded-lg mt-2"
                                    /></td>
                                
                                {label == "admin" &&(

                                <td class="px-4 py-4 text-sm whitespace-nowrap">
                                <div class="flex items-center gap-x-6">
                                    <button  onClick={() => handleDelete(note.$id)} class="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                                </td>

                                )
                                }
                            </tr>
                        ))} 
                        </tbody>
                    ) : (
                <tbody>
                    <tr>
                        <td colSpan="3" className="py-2 px-4 text-center">No notes available</td>
                    </tr>
                </tbody>
            )}
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}

export default Notes
