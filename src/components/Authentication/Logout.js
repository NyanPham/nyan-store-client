import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/authContext'

export default function Logout() {
    const [text, setText] = useState('Is Logging out...')
    const { authLogout } = useAuthContext()
    const navigate = useNavigate()

    useEffect(() => {
        const logout = async () => {
            try {
                const res = await axios({
                    method: 'GET',
                    url: `https://enigmatic-harbor-26816.herokuapp.com/api/v1/users/logOut`,
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
                }, 2500)
            }
        }

        logout()
    }, [authLogout, navigate])

    return <div>{text}</div>
}
