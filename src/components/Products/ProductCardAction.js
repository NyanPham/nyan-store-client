import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faCartPlus, faEye } from '@fortawesome/free-solid-svg-icons'
import { useAuthContext } from '../../context/authContext'
import { useDispatch, useSelector } from 'react-redux'
import { addWishlist, removeWishlist } from '../../redux/actions/wishlistActions'
import { Link } from 'react-router-dom'

function ProductCardAction({ productId }) {
    const isLoggedIn = useAuthContext()
    const wishlist = useSelector((state) => state.wishlist)
    const dispatch = useDispatch()

    const alreadyAdded = wishlist.some((item) => {
        return item.item === productId
    })

    function handleWishlistClick(e) {
        if (!isLoggedIn) return window.location.assign('/log-in')
        if (!alreadyAdded) {
            return dispatch(addWishlist(productId))
        }

        dispatch(removeWishlist(wishlist, productId))
    }

    return (
        <>
            {isLoggedIn ? (
                <>
                    <button
                        className={`w-7 h-5 rounded-3xl border border-slate-500 flex items-center justify-center transform transition duration-200 ${
                            alreadyAdded
                                ? ''
                                : 'translate-x-full pointer-events-none group-hover:translate-x-0 group-hover:pointer-events-auto'
                        }`}
                        onClick={handleWishlistClick}
                    >
                        <FontAwesomeIcon
                            className={`${
                                alreadyAdded ? 'text-red-500' : 'text-slate-500'
                            } w-4 h-4 hover:animate-shake`}
                            icon={faHeart}
                        />
                    </button>
                    <button className="w-7 h-5 rounded-3xl border border-slate-500 flex items-center justify-center transform transition duration-200 translate-x-full pointer-events-none group-hover:translate-x-0 group-hover:pointer-events-auto">
                        <FontAwesomeIcon className="text-slate-500 w-4 h-4 hover:animate-shake" icon={faEye} />
                    </button>
                    <button className="w-7 h-5 rounded-3xl border border-slate-500 flex items-center justify-center transform transition duration-200 translate-x-full pointer-events-none group-hover:translate-x-0 group-hover:pointer-events-auto">
                        <FontAwesomeIcon className="text-slate-500 w-4 h-4 hover:animate-shake" icon={faCartPlus} />
                    </button>
                </>
            ) : (
                <>
                    <Link
                        to={'/log-in'}
                        className={`w-7 h-5 rounded-3xl border border-slate-500 flex items-center justify-center transform transition duration-200 ${
                            alreadyAdded
                                ? ''
                                : 'translate-x-full pointer-events-none group-hover:translate-x-0 group-hover:pointer-events-auto'
                        }`}
                    >
                        <FontAwesomeIcon
                            className={`${
                                alreadyAdded ? 'text-red-500' : 'text-slate-500'
                            } w-4 h-4 hover:animate-shake`}
                            icon={faHeart}
                        />
                    </Link>
                    <Link
                        to={'/log-in'}
                        className="w-7 h-5 rounded-3xl border border-slate-500 flex items-center justify-center transform transition duration-200 translate-x-full pointer-events-none group-hover:translate-x-0 group-hover:pointer-events-auto"
                    >
                        <FontAwesomeIcon className="text-slate-500 w-4 h-4 hover:animate-shake" icon={faEye} />
                    </Link>
                    <Link
                        to={'/log-in'}
                        className="w-7 h-5 rounded-3xl border border-slate-500 flex items-center justify-center transform transition duration-200 translate-x-full pointer-events-none group-hover:translate-x-0 group-hover:pointer-events-auto"
                    >
                        <FontAwesomeIcon className="text-slate-500 w-4 h-4 hover:animate-shake" icon={faCartPlus} />
                    </Link>
                </>
            )}
        </>
    )
}

export default ProductCardAction
