// import React, { useEffect, useState } from 'react';
// import noteService from '../appWrite/auth/config';
// import { Toaster,toast } from 'react-hot-toast';
// import authService from '../appWrite/auth/auth';

// const Allnotes = () => {
//     const [notes, setNotes] = useState([]);

//     useEffect(() => {
//         const fetchNotes = async () => {
//             try {
//                 const data = await noteService.getAllNotes();
//                 console.log(data);
//                 if (Array.isArray(data.documents)) {
//                     setNotes(data.documents);
//                 } else {
//                     console.error('Fetched data is not an array:', data);
//                 }
//             } catch (error) {
//                 console.error('Error fetching notes:', error);
//             }
//         };
//         fetchNotes();
//     }, []);

//     const [visibleImage, setVisibleImage] = useState({});

//     const toggleImageVisibility = (fileId) => {
//         setVisibleImage(prev => ({
//             ...prev,
//             [fileId]: !prev[fileId]
//         }));
//     };

//     const [label, setLabel] = useState();

//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const user = await authService.getCurrentUser();
//           setLabel(user.labels);
//         } catch (error) {
//           toast.error(error.message);
//         }
//       };
//       fetchData();
//     }, []);


//     const handleDelete = async (noteId) => {
//       const confirmed = window.confirm("Are you sure you want to delete this note?");
//       if (confirmed) {
//           const isDeleted = await noteService.deleteNote(noteId);
//           if (isDeleted) {
//               setNotes((prevNotes) => prevNotes.filter(note => note.$id !== noteId));
//               toast.success("Note deleted successfully!");
//           } else {
//               toast.success("Failed to delete the note.");
//           }
//       }
//   };

//   const handleDownload = async (noteId) => {
//     const fileUrl = await noteService.downloadNote(noteId);
//     if (fileUrl) {
//         const link = document.createElement('a');
//         link.href = fileUrl;
//         link.download = ''; // This ensures the browser treats it as a download
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     } else {
//         alert("Failed to download the file.");
//     }
// };

// const [imageUrls, setImageUrls] = useState({});

//     useEffect(() => {
//         const fetchImageUrls = async () => {
//             const urls = {};
//             for (const note of notes) {
//                 const url = await noteService.getFilePreview(note.fileId);
//                 if (url) {
//                     urls[note.fileId] = url; // Store the URL in the state
//                 }
//             }
//             setImageUrls(urls);
//         };

//         fetchImageUrls();
//     }, [notes]);

//     return (
//       <table className="min-w-full divide-y divide-gray-200">
//           <Toaster/>
//             <thead className="bg-gray-50">
//                 <tr>
//                     <th className="py-2 px-4 border-b">Title</th>
//                     <th className="py-2 px-4 border-b">Description</th>
//                     <th className="py-2 px-4 border-b">View</th>
//                     {label == "admin" &&(
//                         <th className="py-2 px-4 border-b">Delete</th>
//                       )
//                     }
//                 </tr>
//             </thead>
//             {Array.isArray(notes) && notes.length > 0 ? (
//                 <tbody>
//                     {notes.map((note) => (
//                         <tr key={note.$id}>
//                             <td className="py-2 px-4 border-b">{note.name}</td>
//                             <td className="py-2 px-4 border-b">{note.description}</td>
//                             <td className="py-2 px-4 border-b">
//                                 <button
//                                     onClick={() => toggleImageVisibility(note.fileId)}
//                                     className="text-blue-500 underline"
//                                 >
//                                     {visibleImage[note.fileId] ? 'Hide' : 'View'}
//                                 </button>
//                                 {visibleImage[note.fileId] && (
//                                     <img
//                                         src={noteService.getFilePreview(note.fileId)} // Use the method to get the preview URL
//                                         alt={note.name}
//                                         className="rounded-lg mt-2"
//                                     />
//                                 )}
//                             </td>
//                             {
//                               label =='admin' && (
//                                 <td className="py-2 px-4 border-b">
//                                 <button
//                                     onClick={() => handleDelete(note.$id)}
//                                     className="text-red-500 underline"
//                                 >
//                                     Delete
//                                 </button>
//                             </td>
//                               )
//                             }
//                         </tr>
//                     ))}
//                 </tbody>
//             ) : (
//                 <tbody>
//                     <tr>
//                         <td colSpan="3" className="py-2 px-4 text-center">No notes available</td>
//                     </tr>
//                 </tbody>
//             )}
//         </table>
//     );
// };

// export default Allnotes;
