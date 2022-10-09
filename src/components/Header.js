import React, { useState, useEffect, useRef } from 'react'
import nyanLogo from '../imgs/nyan-logo.png'
// import Container from './Container'
import SearchForm from './SearchForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowRightArrowLeft,
    faShoppingCart,
    faHeart,
    faMagnifyingGlass,
    faCaretDown,
    faCaretUp,
    faUserCircle,
    faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation } from 'react-router-dom'
import { useSideCartContext } from '../context/sideCartContext'
import { useSelector } from 'react-redux'
import { useAuthContext } from '../context/authContext'
import defaultAvatar from '../imgs/default.jpg'
import { ROOT_URL } from '../config'

const Header = () => {
    const { isLoggedIn, currentUser } = useAuthContext()
    const [scrollDir, setScrollDir] = useState('up')
    const [openAuth, setOpenAuth] = useState(false)
    const [openSearch, setOpenSearch] = useState(false)
    const { setOpenSideCart } = useSideCartContext()
    const { pathname } = useLocation()
    const { cart } = useSelector((state) => state.cart)
    const authRef = useRef()

    const closeAuth = (e) => {
        if (authRef.current.contains(e.target)) return
        setOpenAuth(false)
    }

    useEffect(() => {
        const threshold = 50
        let lastScrollY = window.scrollY
        let ticking = false

        const updateScrollDir = () => {
            const scrollY = window.scrollY

            if (Math.abs(scrollY - lastScrollY) < threshold) {
                ticking = false
                return
            }

            setScrollDir(scrollY > lastScrollY ? 'down' : 'up')
            lastScrollY = scrollY > 0 ? scrollY : 0
            ticking = false
        }

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollDir)
                ticking = true
            }
        }

        window.addEventListener('scroll', onScroll)

        return () => window.removeEventListener('scroll', onScroll)
    }, [scrollDir])

    useEffect(() => {
        window.addEventListener('click', closeAuth)

        return () => window.removeEventListener('click', closeAuth)
    }, [])

    return (
        <header
            className={`sticky top-0 left-0 w-full z-20 bg-white transform transition duration-500 ${
                scrollDir === 'down' ? '-translate-y-full' : 'translate-y-0'
            }`}
        >
            <div className="px-1 py-2 flex flex-row justify-between items-center shadow-lg md:gap-16 md:px-8 lg:px-16 relative">
                <div className="flex items-center gap-6 grow">
                    <Link to="/">
                        <img className="w-32 aspect-40/15" src={nyanLogo} alt="Nyan Logo" />
                    </Link>
                    <SearchForm openSearch={openSearch} />
                </div>
                <div className="flex items-center justify-between gap-3">
                    <button
                        className="header-navigation-btn group md:hidden"
                        onClick={() => setOpenSearch((prevOpenSearch) => !prevOpenSearch)}
                    >
                        <FontAwesomeIcon className="header-navigation-icon" icon={faMagnifyingGlass} />
                    </button>
                    <Link
                        to={`/myOrders`}
                        className="rounded-full border-cyan-400 border-2 header-navigation-btn group"
                    >
                        <FontAwesomeIcon
                            className="text-cyan-400 group-hover:text-cyan-300 group-active:text-cyan-500 transition duration-200"
                            icon={faArrowRightArrowLeft}
                        />
                    </Link>
                    <button
                        className="header-navigation-btn group relative"
                        onClick={() => setOpenSideCart(true)}
                        disabled={pathname.startsWith('/cart')}
                    >
                        <FontAwesomeIcon className="header-navigation-icon" icon={faShoppingCart} />
                        {pathname.startsWith('/cart') && (
                            <div className="absolute top-full px-3 py-1 text-sm bg-slate-200 w-max shadow-lg rounded-xl pointer-events-none transition transform duration-300 opacity-0 -translate-y-3 group-hover:opacity-100 group-hover:translate-y-0">
                                <FontAwesomeIcon
                                    className="absolute bottom-full left-1/2 text-slate-200 translate-y-1/2 -translate-x-1/2"
                                    icon={faCaretUp}
                                />
                                You're at the cart
                            </div>
                        )}
                        {cart.length > 0 && (
                            <div className="w-4 h-4 rounded-full bg-slate-200 absolute -top-0.5 -right-0.5 leading-none text-sm font-semibold flex items-center justify-center">
                                {cart.length < 10 ? cart.length : '9+'}
                            </div>
                        )}
                    </button>
                    <Link to="/wishlist" className="header-navigation-btn group">
                        <FontAwesomeIcon className="header-navigation-icon" icon={faHeart} />
                    </Link>
                    <button
                        className="w-7 h-7 flex items-center justify-center relative group"
                        onClick={() => {
                            setOpenAuth((prevOpenAuth) => !prevOpenAuth)
                        }}
                        ref={authRef}
                    >
                        <img
                            className="w-full h-full object-cover rounded-full overflow-hidden"
                            src={currentUser?.photo ? `${ROOT_URL}/img/users/${currentUser.photo}` : defaultAvatar}
                            alt={`${currentUser?.name || 'avatar'}`}
                            crossOrigin="anonymous"
                        />
                        <FontAwesomeIcon
                            className="hidden absolute left-full top-0 text-slate-300 group-hover:translate-y-1 transform transition duration-200 lg:inline-block"
                            icon={faCaretDown}
                        />
                        {isLoggedIn ? (
                            <>
                                <div
                                    className={`absolute top-full right-0 w-max h-max bg-slate-100 shadow-lg transform transition duration-200 ${
                                        openAuth
                                            ? 'translate-y-0 opacity-100 pointer-events-auto'
                                            : '-translate-y-2 opacity-0 pointer-events-none'
                                    }`}
                                >
                                    <Link
                                        to="/myAccount"
                                        className="flex items-center py-2 px-4 text-slate-700 text-sm transition duration-200 hover:text-white hover:bg-slate-700 text-left"
                                    >
                                        <FontAwesomeIcon className="mr-2 w-4 h-4" icon={faUserCircle} />
                                        My Account
                                    </Link>
                                    <Link
                                        to="/logout"
                                        className="flex items-center py-2 px-4 text-slate-700 text-sm transition duration-200 hover:text-white hover:bg-slate-700 text-left"
                                    >
                                        <FontAwesomeIcon className="mr-2 w-4 h-4" icon={faRightFromBracket} />
                                        Logout
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <div
                                    className={`absolute top-full right-0 w-max h-max bg-slate-100 shadow-lg transform transition duration-200 ${
                                        openAuth
                                            ? 'translate-y-0 opacity-100 pointer-events-auto'
                                            : '-translate-y-2 opacity-0 pointer-events-none'
                                    }`}
                                >
                                    <Link
                                        to="/login"
                                        className="block py-2 px-4 text-slate-700 text-sm transition duration-200 hover:text-white hover:bg-slate-700"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="block py-2 px-4 text-slate-700 text-sm transition duration-200 hover:text-white hover:bg-slate-700"
                                    >
                                        Signup
                                    </Link>
                                </div>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header
