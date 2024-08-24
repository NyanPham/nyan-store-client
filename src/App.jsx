import { useCallback, useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { fetchCollections } from './redux/actions/collectionsActions'
import { fetchCategories } from './redux/actions/categoriesActions'
import { Login, ForgotPassword, ResetPassword, Logout, MyAccount, Signup } from './components/Authentication'
import Footer from './components/Footer'
import Search from './components/Search/Search'
import { SideCart } from './components/Cart'
import { CartPage, WishlistPage, OrderPage, ProductPage } from './components/Pages/index'
import axios from 'axios'
import { configure } from 'axios-hooks'
import LoadingWithAlert from './components/LoadingWithAlert'
import useScrollToTop from './hooks/useScrollToTop'
import SidebarNavigationDrawer from './components/SidebarNavigationDrawer'
import { hideAlert } from './redux/actions/appStatusActions'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://enigmatic-harbor-26816.herokuapp.com',
})

configure({ instance })

// ISSUES: useAuthContext in the app rerender the whole app for sections of products
// though they don't need the authentication to fetch and show products 
// TODO: Find a better place to call the useAuthContext hook
function App() {
    const { loading, message, error, toShowAlert } = useSelector(state => state.appStatus)
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    useScrollToTop(pathname)
    
    const countRef = useRef(0)
    countRef.current++
    console.log("Render: ", countRef.current)

    useEffect(() => {
        dispatch(fetchCollections())
        dispatch(fetchCategories())
    }, [dispatch])

    const closeAlert = useCallback(() => {
        dispatch(hideAlert())
    }, [dispatch])

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
                    showAlert={toShowAlert}
                    message={message}
                    error={error}
                    closeAlert={closeAlert}
                />  
            </div>  
            <div id="modal-container">
                <SidebarNavigationDrawer />
            </div>
        </>
    )
}

export default App
