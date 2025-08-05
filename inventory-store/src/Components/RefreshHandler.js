

import { useStoreActions } from 'easy-peasy'
import  { useEffect } from 'react'
import {  useLocation, useNavigate } from 'react-router-dom'

const RefreshHandler = () => {
    const location= useLocation()
    const navigate= useNavigate()
    const setIsAuthenticated= useStoreActions((action)=> action.setIsAuthenticated)

    useEffect(()=> {
        const token = localStorage.getItem('token')
        if (token){
            setIsAuthenticated(true)
            if (location.pathname==="/" ||
                    location.pathname==="/signup" ||
                    location.pathname==="/login" 
            )
            {
                navigate('/products', {replace:false})
            }
        }
    })
  return (
   null
  )
}

export default RefreshHandler
