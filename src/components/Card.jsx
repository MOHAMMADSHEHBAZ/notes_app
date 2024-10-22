import React from 'react'
import noteService from '../appWrite/auth/config'
import {Link} from 'react-router-dom'

function Card({$id, name, fileId, description}) {
    
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full h-full bg-gray-100 rounded-xl p-4' title='Click to know more'>
            <div className='w-full justify-center mb-4'>
                <img src={noteService.getFilePreview(fileId)} alt={name}
                className='min-h-52 rounded-xl' />
            </div>
            <h2
            className='text-xl font-bold'
            >{name}</h2>
        </div>
    </Link>
  )
}


export default Card