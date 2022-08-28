import React, { useContext, createContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()
export const useAuthContext = () => useContext(AuthContext)

export default function AuthContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        async function fetchIsLoggedIn() {
            try {
                const res = await axios({
                    method: 'GET',
                    url: '/api/v1/users/isLoggedIn',
                })

                if (res.data.status === 'success' && res.data.isLoggedIn) {
                    return setIsLoggedIn(true)
                }

                setIsLoggedIn(false)
            } catch (err) {
                setIsLoggedIn(false)
            }
        }

        fetchIsLoggedIn()
    }, [])

    return (
        <AuthContext.Provider value={isLoggedIn}>
            {children}
        </AuthContext.Provider>
    )
}
