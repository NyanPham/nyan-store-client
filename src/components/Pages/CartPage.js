import React from 'react'
import CartItems from '../Cart/CartItems'
import { useSelector } from 'react-redux'
import OrderNote from '../Cart/OrderNote'
import CouponCode from '../Cart/CouponCode'
import PreCheckoutInfo from '../Cart/PreCheckoutInfo'
import ShippingCalculator from '../Cart/ShippingCalculator'
import { Link } from 'react-router-dom'
import ProductAuction from '../Auction/ProductAuction'

export default function CartPage() {
    const { cart } = useSelector((state) => state.cart)

    return (
        <>
            <h2 className="text-center mt-12 text-slate-700 font-semibold text-2xl">Your Cart</h2>
            <h3 className="text-center mt-2 text-slate-400 font-normal text-base">
                <span className="text-slate-700 font-semibold">{cart.length}</span>{' '}
                {cart.length === 1 ? 'item is' : 'items are'} in your cart
            </h3>
            {cart.length === 0 && (
                <Link
                    to="/"
                    className="mt-3 py-1 px-4 rounded-lg mx-auto block w-max text-white text-md font-semibold tracking-wide transform transition duration-200 bg-cyan-400 hover:-translate-y-1 hover:shadow-lg active:ring-2 active:ring-offset-2 active:ring-cyan-400"
                >
                    Back To Shopping
                </Link>
            )}
            <section className="px-8 mx-auto md:px-0 md:w-4/5">
                <CartItems cart={cart} />
            </section>
            <section className="px-8 mx-auto md:px-0 md:w-4/5 pb-12">
                <form className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2">
                        <OrderNote />
                        <CouponCode />
                    </div>
                    <div className="w-full justify-self-start text-left md:justify-self-end md:text-right mt-7 md:w-1/2">
                        <PreCheckoutInfo />
                    </div>
                </form>
                <div className="mt-12">
                    <ShippingCalculator />
                </div>
            </section>
            <section>
                <ProductAuction />
            </section>
        </>
    )
}
