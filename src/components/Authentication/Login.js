import React, { useRef, useState } from 'react'
import axios from 'axios'
import loginBackground from '../../imgs/ocean.jpg'
import { useAuthContext } from '../../context/authContext'
import { useNavigate, Link } from 'react-router-dom'
import LoadingWithAlert from '../LoadingWithAlert'
import { ROOT_URL } from '../../config'

// Need to move the image background render to the className later
function Login() {
    const { authLogin } = useAuthContext()
    const [showAlert, setShowAlert] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const emailRef = useRef()
    const passwordRef = useRef()

    async function handleFormSubmit(e) {
        e.preventDefault()

        const email = emailRef.current.value
        const password = passwordRef.current.value

        if (email == null || password == null) return alert('Please enter email and password!')

        setIsLoading(true)
        setMessage('')
        setError('')

        try {
            const res = await axios.post(
                `${ROOT_URL}/api/v1/users/logIn`,
                { email, password },
                {
                    withCredentials: true,
                }
            )

            if (res.data.status === 'success') {
                setMessage('Login Successful! Redirecting...')
                authLogin(res.data.currentUser)
                setTimeout(() => navigate('/'), 1500)
            }
        } catch (err) {
            setError(err.response.data.message)
        } finally {
            setShowAlert(true)
            setIsLoading(false)
        }
    }

    const backgroundStyle = {
        backgroundImage: `url(${loginBackground})`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
    }

    return (
        <section className="h-screen w-screen flex flex-col items-center justify-center" style={backgroundStyle}>
            <h1 className="auth-title text-white">Log Into Your Acction</h1>
            <h3 className="auth-subtitle text-white mt-1">Enter the info below to log in</h3>
            <form className="form bg-white shadow-md rounded-md p-7 mt-7" onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">
                        Email:
                    </label>
                    <input className="form-input" type="email" name="email" id="email" required ref={emailRef} />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">
                        Password:
                    </label>
                    <input
                        className="form-input"
                        type="password"
                        name="password"
                        id="password"
                        required
                        ref={passwordRef}
                    />
                </div>
                <button className="form-btn text-white" type="submit">
                    Log In
                </button>
            </form>
            <h3 className="text-white mt-3">
                Forgot your password?{' '}
                <Link to="/forgotPassword" className="text-cyan-400">
                    Reset now
                </Link>
            </h3>
            <LoadingWithAlert
                loading={isLoading}
                showAlert={showAlert}
                message={message}
                error={error}
                setShowAlert={setShowAlert}
            />
        </section>
    )
}

export default Login
