import React from 'react'
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
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import defaultAvatar from '../imgs/default.jpg'

const Header = () => {
    return (
        <header className="sticky top-0 left-0 w-full z-40 bg-white">
            <div className="px-1 py-2 flex flex-row justify-between items-center shadow-lg md:gap-16 md:px-8 lg:px-16">
                <div className="flex items-center gap-6 grow">
                    <img className="w-32 aspect-40/15" src={nyanLogo} alt="Nyan Logo" />
                    <SearchForm />
                </div>
                <div className="flex items-center justify-between gap-3">
                    <button className="header-navigation-btn group md:hidden">
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
                    <button className="header-navigation-btn group">
                        <FontAwesomeIcon className="header-navigation-icon" icon={faShoppingCart} />
                    </button>
                    <button className="header-navigation-btn group">
                        <FontAwesomeIcon className="header-navigation-icon" icon={faHeart} />
                    </button>
                    <button className="w-7 h-7 flex items-center justify-center relative group">
                        <img
                            className="w-full h-full object-cover rounded-full overflow-hidden"
                            src={defaultAvatar}
                            alt="Avatar"
                        />
                        <FontAwesomeIcon
                            className="hidden absolute left-full top-0 text-slate-300 group-hover:translate-y-1 transform transition duration-200 lg:inline-block"
                            icon={faCaretDown}
                        />
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header
