import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faCartPlus, faEye } from '@fortawesome/free-solid-svg-icons'
import { useAuthContext } from '../../context/authContext'
import { Link } from 'react-router-dom'
import useWishlist from '../../hooks/useWishlist'

function ProductCardAction({ productId, handleAddToCart, setOpenQuickView }) {
    const { isLoggedIn } = useAuthContext()
    const { alreadyAdded, handleWishlistClick } = useWishlist(productId)

    return (
        <>
            {isLoggedIn ? (
                <>
                    <button
                        className={`w-8 h-6 rounded-3xl border border-slate-500 flex items-center justify-center transform transition duration-200 ${
                            alreadyAdded
                                ? ''
                                : 'translate-x-full pointer-events-none group-hover:translate-x-0 hover:border-cyan-500 group-hover:pointer-events-auto'
                        }`}
                        onClick={handleWishlistClick}
                    >
                        <FontAwesomeIcon
                            className={`${
                                alreadyAdded ? 'text-red-500' : 'text-slate-500'
                            } w-5 h-5 hover:text-cyan-500 transition duration-200`}
                            icon={faHeart}
                        />
                    </button>
                    <button
                        className="w-8 h-6 rounded-3xl border border-slate-500 flex items-center justify-center transform transition duration-200 translate-x-full pointer-events-none group-hover:translate-x-0 hover:border-cyan-500 group-hover:pointer-events-auto"
                        onClick={() => setOpenQuickView(true)}
                    >
                        <FontAwesomeIcon
                            className="text-slate-500 w-5 h-5 hover:text-cyan-500 transition duration-200"
                            icon={faEye}
                        />
                    </button>
                    <button
                        className="w-8 h-6 rounded-3xl border border-slate-500 flex items-center justify-center transform transition duration-200 translate-x-full pointer-events-none group-hover:translate-x-0 hover:border-cyan-500 group-hover:pointer-events-auto"
                        onClick={() => handleAddToCart(null)}
                    >
                        <FontAwesomeIcon
                            className="text-slate-500 w-5 h-5 hover:text-cyan-500 transition duration-200"
                            icon={faCartPlus}
                        />
                    </button>
                </>
            ) : (
                <>
                    <Link
                        to={'/login'}
                        className={`w-8 h-6 rounded-3xl border border-slate-500 flex items-center justify-center transform transition duration-200 ${
                            alreadyAdded
                                ? ''
                                : 'translate-x-full pointer-events-none group-hover:translate-x-0 hover:border-cyan-500 group-hover:pointer-events-auto'
                        }`}
                    >
                        <FontAwesomeIcon
                            className={`${
                                alreadyAdded ? 'text-red-500' : 'text-slate-500'
                            } w-5 h-5 hover:text-cyan-500 transition duration-200`}
                            icon={faHeart}
                        />
                    </Link>
                    <Link
                        to={'/login'}
                        className="w-8 h-6 rounded-3xl border border-slate-500 flex items-center justify-center transform transition duration-200 translate-x-full pointer-events-none group-hover:translate-x-0 hover:border-cyan-500 group-hover:pointer-events-auto"
                    >
                        <FontAwesomeIcon
                            className="text-slate-500 w-5 h-5 hover:text-cyan-500 transition duration-200"
                            icon={faEye}
                        />
                    </Link>
                    <Link
                        to={'/login'}
                        className="w-8 h-6 rounded-3xl border border-slate-500 flex items-center justify-center transform transition duration-200 translate-x-full pointer-events-none group-hover:translate-x-0 hover:border-cyan-500 group-hover:pointer-events-auto"
                    >
                        <FontAwesomeIcon
                            className="text-slate-500 w-5 h-5 hover:text-cyan-500 transition duration-200"
                            icon={faCartPlus}
                        />
                    </Link>
                </>
            )}
        </>
    )
}

export default ProductCardAction
