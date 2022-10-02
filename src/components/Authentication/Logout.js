import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/authContext'
import { ROOT_URL } from '../../config'

export default function Logout() {
    const [text, setText] = useState('Is Logging out...')
    const { authLogout } = useAuthContext()
    const navigate = useNavigate()

    useEffect(() => {
        const logout = async () => {
            try {
                const res = await axios({
                    method: 'GET',
                    url: `${ROOT_URL}/api/v1/users/logOut`,
                    withCredentials: true,
                })

                if (res.data.status === 'success') {
                    authLogout()
                    setText(res.data.message)
                }
            } catch (err) {
                setText(err.response.data.message)
            } finally {
                setTimeout(() => {
                    navigate('/')
                }, 1000)
            }
        }

        logout()
    }, [authLogout, navigate])

    return (
        <div className="w-screen h-screen flex justify-center items-center text-3xl font-semibold text-cyan-400">
            {text}
        </div>
    )
}
