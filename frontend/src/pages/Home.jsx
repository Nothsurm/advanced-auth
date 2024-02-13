import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

export default function Home() {
    const navigate = useNavigate()
    axios.defaults.withCredentials = true
    const handleLogout = () => {
        axios.get('http://localhost:5000/auth/logout')
        .then(res => {
            if (res.data.status) {
                toast.success('Successfully logged out')
                navigate('/login')
            }
        }).catch(err => {
            toast.error('Could not log out')
            console.log(err);
        })
    }
  return (
    <div>
        <Link to='/dashboard'>
            <button className='bg-red-500 w-full'>
                Dashboard
            </button>
        </Link>
            <button className='bg-red-500 w-full mt-10' onClick={handleLogout}>
                Logout
            </button>

    </div>
  )
}
