import React, { useRef, useState } from 'react'
import axios from 'axios'
import loginBackground from '../../imgs/ocean.jpg'
import { useAuthContext } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'
import { ROOT_URL } from '../../config'
import LoadingWithAlert from '../LoadingWithAlert'

// Need to move the image background render to the className later
function Signup() {
    const { authLogin } = useAuthContext()
    const navigate = useNavigate()

    const [showAlert, setShowAlert] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    async function handleFormSubmit(e) {
        e.preventDefault()

        const name = nameRef.current.value
        const email = emailRef.current.value
        const password = passwordRef.current.value
        const passwordConfirm = passwordConfirmRef.current.value

        if (email == null || password == null) return alert('Please enter email and password!')

        if (password !== passwordConfirm) return alert('Passwords do not match!')

        setIsLoading(true)
        setMessage('')
        setError('')

        try {
            const res = await axios({
                method: 'POST',
                url: `${ROOT_URL}/api/v1/users/signUp`,
                data: {
                    name,
                    email,
                    password,
                    passwordConfirm,
                },
                withCredentials: true,
            })
            if (res.data.status === 'success') {
                setMessage('You have signed up successfully!')
                authLogin()
                navigate('/')
            }
        } catch (err) {
            console.log(err)
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
        <>
            <div className="h-screen w-screen flex flex-col items-center justify-center" style={backgroundStyle}>
                <h1 className="auth-title text-white">Welcome to Nyan Store</h1>
                <h3 className="auth-subtitle text-white mt-1">Enter the info below to create account</h3>
                <form className="form bg-white shadow-md rounded-md p-7 mt-7" onSubmit={handleFormSubmit}>
                    <div className="form-group mt-0">
                        <label htmlFor="name" className="form-label">
                            Name:
                        </label>
                        <input className="form-input" type="text" name="name" id="name" required ref={nameRef} />
                    </div>
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
                    <div className="form-group">
                        <label htmlFor="passwordConfirm" className="form-label">
                            Password Confirm:
                        </label>
                        <input
                            className="form-input"
                            type="password"
                            name="passwordConfirm"
                            id="passwordConfirm"
                            required
                            ref={passwordConfirmRef}
                        />
                    </div>
                    <button className="form-btn" type="submit">
                        Create Account
                    </button>
                </form>
            </div>
            <LoadingWithAlert
                loading={isLoading}
                showAlert={showAlert}
                message={message}
                error={error}
                setShowAlert={setShowAlert}
            />
        </>
    )
}

export default Signup
