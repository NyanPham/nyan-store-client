import React, { useContext, createContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()
export const useAuthContext = () => useContext(AuthContext)

export default function AuthContextProvider({ children }) {
    const [user, setUser] = useState({
        isLoggedIn: false,
        currentUser: {},
    })

    const authLogin = (currentUser) => {
        setUser({
            isLoggedIn: true,
            currentUser: currentUser,
        })
    }

    const authLogout = () => {
        setUser({
            isLoggedIn: false,
        })
    }

    useEffect(() => {
        async function fetchIsLoggedIn() {
            try {
                const res = await axios({
                    method: 'GET',
                    url: `https://enigmatic-harbor-26816.herokuapp.com/api/v1/users/isLoggedIn`,
                })

                if (res.data.status === 'success' && res.data.isLoggedIn && res.data.currentUser != null) {
                    return authLogin(res.data.currentUser)
                }
            } catch (err) {
                authLogout()
            }
        }

        fetchIsLoggedIn()
    }, [])

    return (
        <AuthContext.Provider
            value={{ isLoggedIn: user.isLoggedIn, currentUser: user.currentUser, authLogin, authLogout }}
        >
            {children}
        </AuthContext.Provider>
    )
}
