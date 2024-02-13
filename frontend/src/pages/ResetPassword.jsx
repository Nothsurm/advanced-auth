import Axios from "axios"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom"

export default function ResetPassword() {
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const {token} = useParams()

    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        Axios.post('http://localhost:5000/auth/resetPassword/'+token, {
            password
        }).then(response => {
            if (response.status) {
                toast.success('Password has been reset')
                setLoading(false)
                navigate('/login')
                console.log(response.data)
            } else {
                toast.error(response.message)
                setLoading(false)
            }
            //console.log(response)
        }).catch(err => {
            toast.error(err.message)
            setLoading(false)
            //console.log(err)
        })
    }
  return (
    <div className="flex justify-center mt-10">
    <div className="flex flex-col gap-6">
        <h1 className="font-bold text-xl">Reset Password</h1>
        <form onSubmit={submitHandler}>
            <div className="flex flex-col gap-5">
                <div className="flex flex-col">
                <label htmlFor='email'>
                    New Password:
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
            </div>
            <button disabled={loading} type='submit' className="mt-5 bg-zinc-800 text-white p-2 rounded disabled:opacity-70">
                {loading ? 'Resetting...' : 'Reset'}
            </button>
        </form>
        <div className="mt-4">
            Don't have an account? {" "}
            <Link to={'/signup'} className="hover:underline text-teal-500">
                Register
            </Link>
        </div>
    </div>
</div>
  )
}
