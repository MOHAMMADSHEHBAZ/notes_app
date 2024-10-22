import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import noteService from "../appWrite/auth/config";
import toast, { Toaster } from "react-hot-toast";

export default function Post() {
    const [notes, setNotes] = useState(null);
    const { fileId } = useParams();
    
    const navigate = useNavigate();

    useEffect(() => {
        if (fileId) {
            noteService.getNotes(fileId).then((notes) => {
                if (notes) setNotes(notes);
            });
        } else toast.error("some error occured")
    }, [fileId, navigate]);

    return notes ? (
        <div className="py-8">
            <Toaster/>
            <div className="flex items-center justify-center">
            <div className="w-7/12 p-11 rounded-lg shadow-md bg-gray-50 border flex items-center justify-center flex-col">
            <h1 className="text-2xl font-bold text-red-800">{notes.name}</h1>
            <div className="mt-8 bg-gray-50 flex justify-center mb-4 border rounded-xl p-2">
                {notes.file ? (
                    <img
                        src={noteService.getFilePreview(notes.file)}
                        alt={notes.name}
                        className="rounded-xl"
                    />
                ) : (
                    <p>No file available</p>
                )}
            </div>
            <hr className="text-black w-full mb-3" />
            <p className="text-sm">{notes.description}</p>
            </div>
            </div>
        </div>
    ) : null;
}
