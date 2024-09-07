import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)
    useEffect(()=>{
        if(!auth.token || !auth.username) {
            toast.error('User not logged in!')
            navigate('/login')
        }
    },[])
  return (
    <div>Home</div>
  )
}

export default Home