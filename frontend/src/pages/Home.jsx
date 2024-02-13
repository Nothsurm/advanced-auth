import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
        <Link to='/dashboard'>
            <button className='bg-red-500 w-full'>
                Dashboard
            </button>
        </Link>
            <button className='bg-red-500 w-full mt-10'>
                Logout
            </button>

    </div>
  )
}
