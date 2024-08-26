import { FormEvent, useRef } from 'react'
import axios from 'axios'
import loginBackground from '../../imgs/ocean.jpg'
import nyanLogo from '../../imgs/nyan-logo-white.png'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ROOT_URL } from '../../config'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { hideLoading, setError, setMessage, showLoading, showAlert } from '../../redux/actions/appStatusActions'

// Need to move the image background render to the className later
export default function ForgotPassword() {
    const emailRef = useRef<HTMLInputElement>(null)
    
    const { loading } = useSelector((state : any) => state.appStatus)
    const dispatch = useDispatch()

    async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
            
        const email = emailRef.current?.value

        if (email == null) return alert('Please enter email')

        dispatch(showLoading())
        dispatch(setMessage(''))
        dispatch(setError(''))

        try {
            const res = await axios({
                method: 'POST',
                url: `${ROOT_URL}/api/v1/users/forgotPassword`,
                data: {
                    email,
                },
            })  

            if (res.data.status === 'success') {
                dispatch(setMessage('We have sent you an email to reset your password!'))
            }   
        } catch (err: any) {
            dispatch(setError(err.response.data.message))
        } finally {
            dispatch(showAlert())
            dispatch(hideLoading())
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
                        <LazyLoadImage className="mx-auto w-full h-full" src={nyanLogo} alt="Nyan Store Logo" />
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
                        disabled={loading}
                    >
                        Reset now
                    </button>
                </form>
            </div>
            {/* <LoadingWithAlert
                loading={isLoading}
                showAlert={showAlert}
                message={message}
                error={error}
                setShowAlert={setShowAlert}
            /> */}
        </>
    )
}
