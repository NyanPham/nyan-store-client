import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { fetchCollections } from './redux/actions/collectionsActions'
import { fetchCategories } from './redux/actions/categoriesActions'
import { Login, ForgotPassword, ResetPassword, Logout, MyAccount, Signup } from './components/Authentication'
import { useAuthContext } from './context/authContext'
import { emptyWishlist, getWishlist } from './redux/actions/wishlistActions'
import { getBiddingProduct } from './redux/actions/biddingActions'
import Footer from './components/Footer'
import Search from './components/Search/Search'
import { emptyCart, getCart } from './redux/actions/cartActions'
import { SideCart } from './components/Cart'
import { CartPage, WishlistPage, OrderPage, ProductPage } from './components/Pages/index'
import axios from 'axios'
import { configure } from 'axios-hooks'
import LoadingWithAlert from './components/LoadingWithAlert'
import useScrollToTop from './hooks/useScrollToTop'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://enigmatic-harbor-26816.herokuapp.com',
})

configure({ instance })

function App() {
    const { isLoggedIn } = useAuthContext()
    const { loading, message, error } = useSelector((state) => state.cart)
    const [showAlert, setShowAlert] = useState(false)
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    useScrollToTop(pathname)

    dispatch(fetchCollections())
    dispatch(fetchCategories())
    dispatch(getBiddingProduct())

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getWishlist())
            dispatch(getCart())
        } else {
            dispatch(emptyWishlist())
            dispatch(emptyCart())
        }
    }, [isLoggedIn, dispatch])

    useEffect(() => {
        if (error) {
            setShowAlert(true)
        }
    }, [error, message])

    return (
        <>
            <div className="App min-h-screen flex flex-col">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Header />
                                <Home />
                                <Footer />
                            </>
                        }
                    />
                    <Route
                        path="/categories/:categoryName"
                        element={
                            <>
                                <Header />
                                <Search />
                                <Footer />
                            </>
                        }
                    />
                    <Route
                        path="/categories/:categoryName/:collectionName"
                        element={
                            <>
                                <Header />
                                <Search />
                                <Footer />
                            </>
                        }
                    />
                    <Route
                        path="/products/:slug"
                        element={
                            <>
                                <Header />
                                <ProductPage />
                                <Footer />
                            </>
                        }
                    />
                    <Route
                        path="/cart"
                        element={
                            <>
                                <Header />
                                <CartPage />
                                <Footer />
                            </>
                        }
                    />
                    <Route
                        path="/wishlist"
                        element={
                            <>
                                <Header />
                                <WishlistPage />
                                <Footer />
                            </>
                        }
                    />
                    <Route
                        path="/myOrders"
                        element={
                            <>
                                <Header />
                                <OrderPage />
                                <Footer />
                            </>
                        }
                    />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/myAccount" element={<MyAccount />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/forgotPassword" element={<ForgotPassword />} />
                    <Route path="/resetPassword/:resetToken" element={<ResetPassword />} />
                </Routes>
                <SideCart />

                <LoadingWithAlert
                    loading={loading}
                    showAlert={showAlert}
                    message={message}
                    error={error}
                    setShowAlert={setShowAlert}
                />
            </div>
            <div id="modal-container"></div>
        </>
    )
}

export default App
