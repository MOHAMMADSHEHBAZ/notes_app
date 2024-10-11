import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protected({children, authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {

        if(authentication && authStatus !== authentication){
            navigate("/signin")
        } else if(!authentication && authStatus !== authentication){
            navigate("/MyNotes")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

  return loader ? <h1 className='flex items-center justify-center'>Loading...</h1> : <>{children}</>
}