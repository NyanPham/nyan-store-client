import React, { useContext, createContext, useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { ROOT_URL } from '../config'

const AuthContext = createContext()
export const useAuthContext = () => useContext(AuthContext)

export default function AuthContextProvider({ children }) {
    const [user, setUser] = useState({
        isLoggedIn: false,
        currentUser: {},
    })

    const authLogin = useCallback((currentUser) => {
        setUser({
            isLoggedIn: true,
            currentUser,
        })
    }, [])

    const authLogout = useCallback(() => {
        setUser({
            isLoggedIn: false,
            currentUser: null,
        })
    }, [])

    useEffect(() => {
        async function fetchIsLoggedIn() {
            try {
                const res = await axios.get(`${ROOT_URL}/api/v1/users/isLoggedIn`, {
                    withCredentials: true,
                })

                if (res.data.status === 'success' && res.data.isLoggedIn && res.data.currentUser != null) {
                    return authLogin(res.data.currentUser)
                }
            } catch (err) {
                console.error('Failed to fetch login status:', err)
                authLogout()
            }
        }

        fetchIsLoggedIn()
    }, [authLogin, authLogout])

    return (
        <AuthContext.Provider
            value={{ isLoggedIn: user.isLoggedIn, currentUser: user.currentUser, authLogin, authLogout }}
        >
            {children}
        </AuthContext.Provider>
    )
}
