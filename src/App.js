import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Signup from './components/Authentication/Signup'
import Header from './components/Header'
import Home from './components/Home'
import SidebarNavigationDrawer from './components/SidebarNavigationDrawer'
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

function App() {
    const { isLoggedIn } = useAuthContext()
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
                    <Route
                        path="/search"
                        element={
                            <>
                                <Header />
                                <Search />
                                <Footer />
                            </>
                        }
                    />
                    <Route
                        path="/categories"
                        element={
                            <>
                                <Header />
                                <Search />
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
                    <Route path="/sign-up" element={<Signup />} />
                    <Route path="/log-in" element={<Login />} />
                </Routes>
            </div>
            <SideCart />
            <div id="modal-container"></div>
        </>
    )
}

export default App
