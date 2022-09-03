import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Signup from './components/Authentication/Signup'
import Header from './components/Header'
import Home from './components/Home'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { fetchCollections } from './redux/actions/collectionsActions'
import { fetchCategories } from './redux/actions/categoriesActions'
import Login from './components/Authentication/Login'
import { useAuthContext } from './context/authContext'
import { emptyWishlist, getWishlist } from './redux/actions/wishlistActions'
import { getBiddingProduct } from './redux/actions/biddingActions'
import Footer from './components/Footer'
import Search from './components/Search/Search'
import ProductPage from './components/Pages/ProductPage'
import { emptyCart, getCart } from './redux/actions/cartActions'
import SideCart from './components/Cart/SideCart'
import CartPage from './components/Pages/CartPage'
import MyAccount from './components/Authentication/MyAccount'
import Logout from './components/Authentication/Logout'
import ForgotPassword from './components/Authentication/ForgotPassword'
import ResetPassword from './components/Authentication/ResetPassword'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import Alert from './components/Alert/Alert'
import ReactDOM from 'react-dom'

function App() {
    const { isLoggedIn } = useAuthContext()
    const { loading, message, error } = useSelector((state) => state.cart)
    const [showAlert, setShowAlert] = useState(false)
    const dispatch = useDispatch()

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

    console.log(error)

    return (
        <>
            <div className="App ">
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
                    {/* <Route
                        path="/search/:categoryName"
                        element={
                            <>
                                <Header />
                                <Search />
                                <Footer />
                            </>
                        }
                    /> */}
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
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/myAccount" element={<MyAccount />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/forgotPassword" element={<ForgotPassword />} />
                    <Route path="/resetPassword/:resetToken" element={<ResetPassword />} />
                </Routes>
                <SideCart />

                {loading && (
                    <div className="z-30 fixed top-0 left-0 w-full h-full bg-gray-900/80 flex justify-center items-center">
                        <FontAwesomeIcon icon={faSpinner} className="text-cyan-400 w-16 h-16 animate-spin" />
                    </div>
                )}
                {showAlert &&
                    ReactDOM.createPortal(
                        <>
                            <Alert
                                type={message ? 'success' : 'error'}
                                message={message ? message : error ? error : ''}
                                delayToClose={3000}
                                closeCallback={() => setShowAlert(false)}
                            />
                        </>,
                        document.getElementById('modal-container')
                    )}
            </div>
            <div id="modal-container"></div>
        </>
    )
}

export default App
