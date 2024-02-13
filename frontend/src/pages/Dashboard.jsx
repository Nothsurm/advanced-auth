import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function Dashboard() {
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:5000/auth/verify')
        .then(res => {
            if (res.data.status) {
            } else {
                toast.error('Not authorized')
                navigate('/login')
            }
        })
    }, [])
  return (
    <div>Dashboard</div>
  )
}
