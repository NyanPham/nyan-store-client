import { FormEvent, useRef } from 'react'
import axios from 'axios'
import loginBackground from '../../imgs/ocean.jpg'
import { useNavigate, useParams } from 'react-router-dom'
import { ROOT_URL } from '../../config'
import { useDispatch } from 'react-redux'
import { hideAlert, hideLoading, setError, setMessage, showAlert, showLoading } from '../../redux/actions/appStatusActions'

// Need to move the image background render to the className later
export default function ResetPassword() {
    const { resetToken } = useParams()
   
    const passwordRef = useRef<HTMLInputElement>(null)
    const passwordConfirmRef = useRef<HTMLInputElement>(null)

    const navigate = useNavigate()

    const dispatch = useDispatch()
    
    async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        
        const password = passwordRef.current?.value
        const passwordConfirm = passwordConfirmRef.current?.value

        if (password == null) {
            dispatch(setMessage('Please enter new password to reset!'))
            dispatch(showAlert())
            return
        }
        
        dispatch(showLoading())
        dispatch(setMessage(''))
        dispatch(setError(''))
        dispatch(hideAlert())

        try {
            const res = await axios({
                method: 'PATCH',
                url: `${ROOT_URL}/api/v1/users/resetPassword/${resetToken}`,
                data: {
                    password,
                    passwordConfirm,
                },
                withCredentials: true,
            })

            if (res.data.status === 'success') {
                dispatch(setMessage('Your password has been reset!'))
                setTimeout(() => navigate('/login'), 2000)
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
        <section className="h-screen w-screen flex flex-col items-center justify-center" style={backgroundStyle}>
            <h1 className="auth-title text-white">Reset Password</h1>
            <form className="form bg-white shadow-md rounded-md p-7 mt-7" onSubmit={handleFormSubmit}>
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
                    <label htmlFor="password-confirm" className="form-label">
                        Confirm Password:
                    </label>
                    <input
                        className="form-input"
                        type="password"
                        name="passwordConfirm"
                        id="password-confirm"
                        required
                        ref={passwordConfirmRef}
                    />
                </div>
                <button className="form-btn text-white" type="submit">
                    Reset now
                </button>
            </form>
        </section>
    )
}
