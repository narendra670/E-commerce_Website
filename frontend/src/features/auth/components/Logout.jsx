import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutAsync } from '../AuthSlice'

export const Logout = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()

    useEffect(()=>{
        dispatch(logoutAsync())
        navigate("/login")
    },[dispatch, navigate])

  return null
}