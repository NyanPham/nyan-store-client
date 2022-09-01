import React, { useRef } from 'react'
import axios from 'axios'
import loginBackground from '../../imgs/login-background.jpg'
import { useAuthContext } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'

// Need to move the image background render to the className later
function Login() {
    const { authLogin } = useAuthContext()
    const navigate = useNavigate()

    const emailRef = useRef()
    const passwordRef = useRef()

    async function handleFormSubmit(e) {
        e.preventDefault()

        const email = emailRef.current.value
        const password = passwordRef.current.value

        if (email == null || password == null) return alert('Please enter email and password!')

        try {
            const res = await axios({
                method: 'POST',
                url: '/api/v1/users/logIn',
                data: {
                    email,
                    password,
                },
            })
            if (res.data.status === 'success') {
                alert('You have logged in successfully!')
                authLogin()
                navigate(-1, { replace: true })
            }
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    const backgroundStyle = {
        backgroundImage: `url(${loginBackground})`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
    }

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center" style={backgroundStyle}>
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
                <button className="form-btn" type="submit">
                    Log In
                </button>
            </form>
        </div>
    )
}

export default Login
