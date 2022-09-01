import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useSideCartContext } from '../../context/sideCartContext'
import useOverlay from '../../hooks/useOverlay'
import getMatchedButton from '../../utils/getMatchedButton'
import SideProductCard from './SideProductCard'

export default function SideCart() {
    const { cart, loading, message, error } = useSelector((state) => state.cart)
    const { openSideCart, setOpenSideCart } = useSideCartContext()

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
                } transition transform duration-200 fixed top-0 right-0 w-1/5 h-full bg-white shadow-lg z-20`}
            >
                <div className="flex items-center justify-between p-3">
                    <h2 className="text-base uppercase font-medium">Shopping Cart</h2>
                    <button className="text-gray-700" onClick={handleCloseClick} data-close-side-cart>
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </div>
                <div className="max-h-96 overflow-auto p-3 pt-0 scrollbar-thumb-rounded scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-gray-100">
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
            </div>
        </>
    )
}
