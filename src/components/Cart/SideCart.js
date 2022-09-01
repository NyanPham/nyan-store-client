import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useSideCartContext } from '../../context/sideCartContext'
import getMatchedButton from '../../utils/getMatchedButton'
import SideCoupon from './SideCoupon'
import SideOrderNote from './SideOrderNote'
import SideProductCard from './SideProductCard'
import SideShippingCalculator from './SideShippingCalculator'

export default function SideCart() {
    const { cart, loading, message, error } = useSelector((state) => state.cart)
    const { openSideCart, setOpenSideCart } = useSideCartContext()
    const subtotal = cart.reduce((total, item) => item.variant.price * item.quantity, 0)

    const closeModal = () => {
        setOpenSideCart(false)
    }

    const handleCloseClick = (e) => {
        const button = getMatchedButton(e, '[data-close-side-cart]')
        if (!button) return

        closeModal()
    }

    return (
        <>
            <span
                className={`${
                    openSideCart ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                } transition duration-200 overlay z-20`}
                onClick={closeModal}
            />
            <div
                className={`${
                    openSideCart ? 'translate-x-0' : 'translate-x-full'
                } transition transform duration-200 flex flex-col fixed top-0 right-0 w-72 h-full bg-white shadow-lg z-20`}
            >
                <div className="flex items-center justify-between p-5 shadow-md">
                    <h2 className="text-base uppercase font-medium">Shopping Cart</h2>
                    <button className="text-gray-700" onClick={handleCloseClick} data-close-side-cart>
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </div>
                <div className="h-96 overflow-auto p-5 pt-0 scrollbar-thumb-rounded scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-gray-100">
                    {cart.map((item, index) => (
                        <SideProductCard
                            key={`cart_item_${index}`}
                            currentVariant={item.variant}
                            currentQuantity={item.quantity}
                            productId={item.product}
                            isLast={index === cart.length - 1}
                        />
                    ))}
                </div>
                <div className="shadow-top pb-5 relative">
                    <div className="py-5">
                        <div className="flex justify-evenly items-center">
                            <SideOrderNote />
                            <span className="h-8 border border-gray-700/30"></span>
                            <SideShippingCalculator />
                            <span className="h-8 border border-gray-700/30"></span>
                            <SideCoupon />
                        </div>
                    </div>
                    <div className="px-5 flex justify-between items-center">
                        <h3 className="text-lg text-slate-700 font-semibold">Subtotal:</h3>
                        <span className="text-xl text-slate-700 font-semibold">
                            ${subtotal.toLocaleString('en-US')}
                        </span>
                    </div>
                    <div className="px-5 flex flex-col gap-3 justify-center items-center mt-4">
                        <Link
                            to="/checkout"
                            className="text-lg text-center text-white font-semibold tracking-wide bg-cyan-400 py-1 px-4 rounded-lg flex-grow flex-shrink-0 w-full transition transform duration-200 hover:-translate-y-1 active:-translate-y-1 active:bg-cyan-500"
                        >
                            Checkout
                        </Link>
                        <Link
                            to="/cart"
                            className="text-lg text-center text-slate-700 font-semibold tracking-wide bg-white border border-slate-700 py-1 px-4 rounded-lg flex-grow flex-shrink-0 w-full transition transform duration-200 hover:-translate-y-1 active:-translate-y-1 active:bg-slate-700 active:text-white"
                        >
                            View Cart
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
