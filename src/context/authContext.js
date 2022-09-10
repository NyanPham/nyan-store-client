import React, { useContext, createContext, useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const AuthContext = createContext()
export const useAuthContext = () => useContext(AuthContext)

export default function AuthContextProvider({ children }) {
    const [user, setUser] = useState({
        isLoggedIn: false,
        currentUser: {},
    })

    const authLogin = useCallback((currentUser) => {
        console.log(currentUser)
        setUser({
            isLoggedIn: true,
            currentUser: currentUser,
        })
    }, [])

    console.log(user)

    const authLogout = useCallback(() => {
        setUser({
            isLoggedIn: false,
        })
    }, [])

    useEffect(() => {
        async function fetchIsLoggedIn() {
            try {
                const res = await axios.get('https://enigmatic-harbor-26816.herokuapp.com/api/v1/users/isLoggedIn', {
                    withCredentials: true,
                })

                if (res.data.status === 'success' && res.data.isLoggedIn && res.data.currentUser != null) {
                    return authLogin(res.data.currentUser)
                }
            } catch (err) {
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
