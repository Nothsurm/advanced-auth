import Axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from 'react-toastify'

export default function SignUp() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (password !== confirmPassword) {

        }
        Axios.post('http://localhost:5000/auth/signup', {
            username, 
            email, 
            password
        }).then(response => {
            toast.success('Registration Successfull')
            setLoading(false)
            console.log(response)
        }).catch(err => {
            toast.error(err.message)
            setLoading(false)
            console.log(err)
        })
    }
  return (
    <div className="flex justify-center mt-10">
    <div className="flex flex-col gap-6">
        <h1 className="font-bold text-xl">Register</h1>
        <form onSubmit={submitHandler}>
            <div className="flex flex-col gap-5">
                <div className="flex flex-col">
                <label htmlFor='name'>
                    Name:
                </label>
                <input 
                    type="text" 
                    id='name'
                    placeholder="Enter name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border rounded-lg p-2"
                />
                </div>
                <div className="flex flex-col">
                <label htmlFor='email'>
                    Email:
                </label>
                <input 
                    type="email" 
                    id='email'
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border rounded-lg p-2"
                />
                </div>
                <div className="flex flex-col">
                <label htmlFor='password'>
                    Password:
                </label>
                <input 
                    type="password" 
                    id='password'
                    placeholder="******"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border rounded-lg p-2"
                />
                </div>
                <div className="flex flex-col">
                <label htmlFor='confirm-password'>
                    Confirm Password:
                </label>
                <input 
                    type="password" 
                    id='confirm-password'
                    placeholder="******"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border rounded-lg p-2"
                />
                </div>
            </div>
            <button disabled={loading} type='submit' className="mt-5 bg-zinc-800 text-white p-2 rounded">
                {loading ? 'Registering...' : 'Register'}
            </button>
        </form>
        <div className="mt-4">
            Already have an account? {" "}
            <Link to={'/login'} className="hover:underline text-teal-500">
                Login
            </Link>
        </div>
    </div>
</div>
  )
}
