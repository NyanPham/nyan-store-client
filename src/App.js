import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Signup from './components/Authentication/Signup'
import Header from './components/Header'
import Home from './components/Home'
import SidebarNavigationDrawer from './components/SidebarNavigationDrawer'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { fetchCollections } from './redux/actions/collectionsActions'
import Login from './components/Authentication/Login'
import { useAuthContext } from './context/authContext'
import { emptyWishlist, getWishlist } from './redux/actions/wishlistActions'

function App() {
    const isLoggedIn = useAuthContext()
    const dispatch = useDispatch()
    const wishlist = useSelector((state) => state.wishlist)
    console.log(wishlist)

    dispatch(fetchCollections())

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getWishlist())
        } else {
            dispatch(emptyWishlist)
        }
    }, [isLoggedIn, dispatch])

    return (
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Header />
                            <Home />
                        </>
                    }
                />
                <Route path="/sign-up" element={<Signup />} />
                <Route path="/log-in" element={<Login />} />
            </Routes>
            <SidebarNavigationDrawer />
        </div>
    )
}

export default App
