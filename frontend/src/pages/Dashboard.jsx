import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:5000/auth/verify')
        .then(res => {
            if (res.data.status) {

            } else {
                navigate('/')
            }
        })
    }, [])
  return (
    <div>Dashboard</div>
  )
}
