import React, { useRef, useState } from 'react'
import axios from 'axios'
import loginBackground from '../../imgs/ocean.jpg'
import nyanLogo from '../../imgs/nyan-logo-white.png'
import { Link } from 'react-router-dom'
import LoadingWithAlert from '../LoadingWithAlert'

// Need to move the image background render to the className later
export default function ForgotPassword() {
    const [showAlert, setShowAlert] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    // const navigate = useNavigate()

    const emailRef = useRef()

    async function handleFormSubmit(e) {
        e.preventDefault()

        const email = emailRef.current.value

        if (email == null) return alert('Please enter email')

        setIsLoading(true)
        setMessage('')
        setError('')

        try {
            const res = await axios({
                method: 'POST',
                url: `https://enigmatic-harbor-26816.herokuapp.com/api/v1/users/forgotPassword`,
                data: {
                    email,
                },
            })

            if (res.data.status === 'success') {
                setMessage('We have sent you an email to reset your password!')
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
        <>
            <div className="h-screen w-screen flex flex-col items-center justify-center" style={backgroundStyle}>
                <div className="logo-container mx-auto text-center">
                    <Link to="/" className="inline-block h-12 w-auto">
                        <img className="mx-auto w-full h-full" src={nyanLogo} alt="Nyan Store Logo" />
                    </Link>
                </div>
                <h1 className="auth-title text-white">Forgot your password?</h1>
                <h3 className="auth-subtitle text-white mt-1">Enter your email to reset now</h3>
                <form className="form bg-white shadow-md rounded-md p-7 mt-7" onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            Email:
                        </label>
                        <input className="form-input" type="email" name="email" id="email" required ref={emailRef} />
                    </div>
                    <button
                        className="form-btn text-white disabled:bg-gray-300 disabled:text-slate-700"
                        type="submit"
                        disabled={isLoading}
                    >
                        Reset now
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
