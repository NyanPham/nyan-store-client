import { FormEvent, useRef, useState } from 'react'
import nyanStore from '../../imgs/nyan-logo-white.png'
import { Link } from 'react-router-dom'
import backgroundImage from '../../imgs/ocean.jpg'
import { useAuthContext } from '../../context/authContext'
import axios from 'axios'
import { ROOT_URL } from '../../config'
import AdminMainPanel from '../Admin/AdminMainPanel'
import { useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { useDispatch } from 'react-redux'
import { hideAlert, hideLoading, setError, setMessage, showAlert, showLoading } from '../../redux/actions/appStatusActions'

export default function MyAccount() {
    const { currentUser, authLogin } = useAuthContext()
    const [currentPassword, setCurrentPassword] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [formShow, setFormShow] = useState('data')
    const photoRef = useRef<HTMLInputElement>(null)
    const profileFormRef = useRef<HTMLFormElement>(null)
    const passwordFormRef = useRef<HTMLFormElement>(null)
    const adminFormRef = useRef<HTMLFormElement>(null)
    
    const dispatch = useDispatch()

    const backgroundStyles = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }

    const handleUserUpdate = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const targetElement = e.target as HTMLElement;

        const url =
            targetElement.dataset.userUpdate === 'password'
                ? `${ROOT_URL}/api/v1/users/updatePassword`
                : `${ROOT_URL}/api/v1/users/updateMe`

        const inputElemNames = [...targetElement.querySelectorAll('input[name]')].map((input) => {
            return {
                name: (input as HTMLInputElement).name,
                value: (input as HTMLInputElement).value,
            }
        })

        const userUpdateForm = new FormData()
        inputElemNames.forEach((field) => {
            if (field.name === 'photo' && photoRef.current?.files?.[0] != null) {
                userUpdateForm.append('photo', photoRef.current.files[0])
            } else {
                userUpdateForm.append(field.name, field.value)
            }
        })

        dispatch(showLoading())
        dispatch(setMessage(''))
        dispatch(setError(''))
        dispatch(hideAlert())

        try {
            const res = await axios({
                method: 'PATCH',
                url,
                data: userUpdateForm,
                withCredentials: true,
            })

            if (res.data.status === 'success') {
                authLogin(res.data.data.user)
                dispatch(setMessage(`Your ${targetElement.dataset.userUpdate} has been updated successfully!`))
            }
        } catch (err: any) {
            dispatch(setError(err.response.data.message))
        } finally {
            dispatch(hideLoading())
            dispatch(showAlert())

            if (targetElement.dataset.userUpdate === 'password') {
                setCurrentPassword('')
                setPassword('')
                setPasswordConfirm('')
            }
        }
    }
    
    useEffect(() => {
        if (formShow === 'data') {
        }
    }, [formShow])

    return (
        <section className="auth-section p-5 text-center min-h-screen h-max" style={backgroundStyles}>
            <div className="logo-container mx-auto text-center">
                <Link to="/" className="inline-block h-12 w-auto">
                    <LazyLoadImage className="mx-auto w-full h-full" src={nyanStore} alt="Nyan Store Logo" />
                </Link>
            </div>
            <h2 className="text-white text-3xl font-semibold mt-2">Your Account</h2>
            <ul className="form w-3/4 flex gap-2 mx-auto mt-4">
                <li
                    className={`cursor-pointer p-2 rounded-lg text-white flex-grow transition transform duration-200  ${
                        formShow === 'data'
                            ? 'bg-cyan-400 text-semibold'
                            : 'bg-slate-700/30 hover:bg-slate-500/20 active:bg-slate-700/30 active:ring active:ring-cyan-400 active-ring-offset-2'
                    }`}
                    onClick={() => setFormShow('data')}
                >
                    <span className="">Profile</span>
                </li>
                <li
                    className={`cursor-pointer p-2 rounded-lg text-white flex-grow transition transform duration-200 ${
                        formShow === 'password'
                            ? 'bg-cyan-400 text-semibold'
                            : 'bg-slate-700/30 hover:bg-slate-500/20 active:bg-slate-700/30 active:ring active:ring-cyan-400 active-ring-offset-2 '
                    }`}
                    onClick={() => setFormShow('password')}
                >
                    <span className="">Password</span>
                </li>
                {currentUser?.role === 'admin' && (
                    <li
                        className={`cursor-pointer p-2 rounded-lg text-white flex-grow transition transform duration-200 ${
                            formShow === 'admin'
                                ? 'bg-cyan-400 text-semibold'
                                : 'bg-slate-700/30 hover:bg-slate-500/20 active:bg-slate-700/30 active:ring active:ring-cyan-400 active-ring-offset-2 '
                        }`}
                        onClick={() => setFormShow('admin')}
                    >
                        <span className="">Admin</span>
                    </li>
                )}
            </ul>
            <div className="relative w-full">
                {/* For email and name */}
                <form
                    className={`form w-3/4 p-7 mt-7 rounded-lg bg-white mx-auto transform transition duration-300 ${
                        formShow === 'data'
                            ? 'block opacity-100 pointer-events-auto'
                            : ' hidden opacity-0 pointer-events-none'
                    }`}
                    data-user-update="data"
                    onSubmit={handleUserUpdate}
                    ref={profileFormRef}
                >
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">
                            Username:
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            defaultValue={currentUser?.name || ''}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">
                            Email:
                        </label>
                        <input
                            className="form-input"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your new email"
                            defaultValue={currentUser?.email || ''}
                        />
                    </div>
                    <div className="form-group">
                        <h1 className="form-label">Avatar:</h1>
                        <div className="flex justify-start items-center gap-5 mt-3">
                            <LazyLoadImage
                                className="w-20 h-20 rounded-full object-cover object-center "
                                src={`${ROOT_URL}/img/users/${currentUser?.photo ? currentUser.photo : 'default.jpg'}`}
                                alt={currentUser?.name ? currentUser.name : 'user photo'}
                                crossOrigin="anonymous"
                            />
                            <input className="hidden" type="file" id="photo" name="photo" ref={photoRef} />
                            <label
                                className="py-2 cursor-pointer relative leading-none text-cyan-400 font-semibold after:content=[''] after:absolute after:left-0 after:top-full after:w-full after:h-0.5 after:bg-cyan-400 after:scale-x-0 after:transition after:transform after:duration-200 after:origin-right hover:after:scale-x-100 hover:after:origin-left    "
                                htmlFor="photo"
                            >
                                Upload photo
                            </label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-7 py-2 text-white font-semibold rounded-md bg-cyan-400 transform transition duration-300 hover:-translate-y-1 active:ring-2 active:ring-offset-2 active:ring-cyan-400"
                    >
                        Update Data
                    </button>
                </form>
                {/* For password update  */}

                <form
                    className={`form w-3/4 p-7 mt-7 rounded-lg bg-white mx-auto transform transition duration-300 ${
                        formShow === 'password'
                            ? 'block opacity-100 pointer-events-auto'
                            : ' hidden opacity-0 pointer-events-none'
                    }`}
                    data-user-update="password"
                    onSubmit={handleUserUpdate}
                    ref={passwordFormRef}
                >
                    <div className="form-group">
                        <label className="form-label" htmlFor="current-password">
                            Current Password:
                        </label>
                        <input
                            className="form-input"
                            type="password"
                            id="current-password"
                            name="currentPassword"
                            value={currentPassword}
                            placeholder="******"
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="password">
                            Password:
                        </label>
                        <input
                            className="form-input"
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="******"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="password-confirm">
                            Confirm Password:
                        </label>
                        <input
                            className="form-input"
                            type="password"
                            id="password-confirm"
                            name="passwordConfirm"
                            value={passwordConfirm}
                            placeholder="******"
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-7 py-2 text-white font-semibold rounded-md bg-cyan-400 transform transition duration-300 hover:-translate-y-1 active:ring-2 active:ring-offset-2 active:ring-cyan-400"
                    >
                        Update Password
                    </button>
                </form>
                {/* For Admin */}
                <AdminMainPanel formShow={formShow} handleUserUpdate={handleUserUpdate} adminFormRef={adminFormRef} />
            </div>
        </section>
    )
}
