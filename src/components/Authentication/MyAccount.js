import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import nyanStore from '../../imgs/nyan-logo-white.png'
import { Link } from 'react-router-dom'
import backgroundImage from '../../imgs/ocean.jpg'
import { useAuthContext } from '../../context/authContext'
import axios from 'axios'
import Alert from '../Alert/Alert'
import useDeepCompareEffect from '../../hooks/useDeepCompareEffect'

export default function MyAccount() {
    const { currentUser } = useAuthContext()
    const [email, setEmail] = useState(() => (currentUser && currentUser?.email) || '')
    const [name, setName] = useState(() => (currentUser && currentUser?.name) || '')
    const [photo, setPhoto] = useState(() => (currentUser && currentUser?.photo) || 'default.jpg')
    const [currentPassword, setCurrentPassword] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [formShow, setFormShow] = useState('data')
    const [showAlert, setShowAlert] = useState(false)
    const photoRef = useRef()

    console.log(isLoading)
    const backgroundStyles = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }

    const handleUserUpdate = async (e) => {
        e.preventDefault()
        const url =
            e.target.dataset.userUpdate === 'password'
                ? `https://enigmatic-harbor-26816.herokuapp.com/api/v1/users/updatePassword`
                : `https://enigmatic-harbor-26816.herokuapp.com/api/v1/users/updateMe`

        const inputElemNames = [...e.target.querySelectorAll('input[name]')].map((input) => {
            return {
                name: input.name,
                value: input.value,
            }
        })

        const userUpdateForm = new FormData()
        inputElemNames.forEach((field) => {
            if (field.name === 'photo') {
                userUpdateForm.append('photo', photoRef.current.files[0])
            } else {
                userUpdateForm.append(field.name, field.value)
            }
        })

        setIsLoading(true)
        setMessage('')
        setError('')
        try {
            const res = await axios({
                method: 'PATCH',
                url,
                data: userUpdateForm,
            })

            if (res.data.status === 'success') {
                setMessage(`Your ${e.target.dataset.userUpdate} has been updated successfully!`)
            }
        } catch (err) {
            setError(err.response.data.message)
        } finally {
            setIsLoading(false)
            setShowAlert(true)

            if (e.target.dataset.userUpdate === 'password') {
                setCurrentPassword('')
                setPassword('')
                setPasswordConfirm('')
            }
        }
    }

    useDeepCompareEffect(() => {
        setEmail(currentUser?.email)
        setName(currentUser?.name)
        setPhoto(currentUser?.photo)
    }, [currentUser])

    return (
        <section className="auth-section p-5 text-center min-h-screen" style={backgroundStyles}>
            <div className="logo-container mx-auto text-center">
                <Link to="/" className="inline-block h-12 w-auto">
                    <img className="mx-auto w-full h-full" src={nyanStore} alt="Nyan Store Logo" />
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
            </ul>
            <div className="relative w-full">
                {/* For email and name */}

                <form
                    className={`form w-3/4 p-7 mt-7 rounded-lg bg-white mx-auto transform transition duration-300 ${
                        formShow === 'data' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                    data-user-update="data"
                    onSubmit={handleUserUpdate}
                >
                    {/* <h5 className="text-slate-600 text-lg font-normal">
                    You can only update either email or password at a time
                </h5> */}
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <h1 className="form-label">Avatar:</h1>
                        <div className="flex justify-start items-center gap-5 mt-3">
                            <img
                                className="w-20 h-20 rounded-full object-cover object-center "
                                src={`/img/users/${photo ? photo : 'default.jpg'}`}
                                alt={name ? name : 'user photo'}
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
                    className={`absolute top-0 left-1/2 -translate-x-1/2 form w-3/4 p-7 rounded-lg bg-white mx-auto transform transition duration-300 ${
                        formShow === 'password' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                    data-user-update="password"
                    onSubmit={handleUserUpdate}
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
            </div>
            {showAlert &&
                ReactDOM.createPortal(
                    <Alert
                        type={message ? 'success' : 'error'}
                        message={message ? message : error ? error : ''}
                        delayToClose={3000}
                        closeCallback={() => setShowAlert(false)}
                    />,
                    document.getElementById('modal-container')
                )}
        </section>
    )
}
