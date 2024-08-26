import { useContext, createContext, useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { ROOT_URL } from '../config'
import { User } from '../types'

const AuthContext = createContext({
    isLoggedIn: false,
    currentUser: null as User,
    authLogin: (_: User) => {},
    authLogout: () => {},
})
export const useAuthContext = () => useContext(AuthContext)

type AuthContextProviderProps = {
    children: React.ReactNode
}
export default function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState<{
        isLoggedIn: boolean
        currentUser: User
    }>({
        isLoggedIn: false,
        currentUser: null,
    })

    const authLogin = useCallback((currentUser : User) => {
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
