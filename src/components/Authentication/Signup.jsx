import React, { useRef } from 'react'
import axios from 'axios'
import loginBackground from '../../imgs/ocean.jpg'
import { useAuthContext } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'
import { ROOT_URL } from '../../config'
import { hideAlert, hideLoading, setError, setMessage, showAlert, showLoading } from '../../redux/actions/appStatusActions'
import { useDispatch } from 'react-redux'

// Need to move the image background render to the className later
function Signup() {
    const { authLogin } = useAuthContext()
    const navigate = useNavigate()

    const dispatch = useDispatch()
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

        dispatch(showLoading())
        dispatch(setMessage(''))
        dispatch(setError(''))
        dispatch(hideAlert())
    
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
                dispatch(setMessage('You have signed up successfully!'))
                authLogin()
                navigate('/')
            }
        } catch (err) {
            console.log(err)
            dispatch((setError(err.response.data.message)))
        } finally {
            dispatch(hideLoading())
            dispatch(showAlert())
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
        </>
    )
}

export default Signup
