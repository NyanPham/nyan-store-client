import React, { useEffect } from 'react'
import VariantsPicker from '../Products/VariantsPicker'
import { useDispatch, useSelector } from 'react-redux'
import { auctionProduct, resetMessagesAndError } from '../../redux/actions/biddingActions'
import { useState } from 'react'
import { ROOT_URL } from '../../config'

function AuctionForm({ product, setOpenModal, currentBid }) {
    const { message, error } = useSelector((state) => state.biddingProducts)
    const [selectedVariant, setSelectedVariant] = useState(product?.variants[0])
    const dispatch = useDispatch()

    function formSubmitHandler({ variantId, bidPrice }) {
        dispatch(
            auctionProduct({
                variant: variantId,
                product: product._id,
                price: bidPrice,
                duesIn: product.auctionExpiresIn,
            })
        )
    }

    useEffect(() => {
        if (message && !error) {
            setTimeout(() => {
                dispatch(resetMessagesAndError())
            }, 3000)
        }
    }, [message, dispatch, error])

    return (
        <>
            <span className="overlay" />
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-30-rem h-auto bg-white z-30 p-7 flex gap-4">
                <button className="absolute top-2 right-2 text-xl text-gray-900" onClick={() => setOpenModal(false)}>
                    &times;
                </button>
                <div className="w-1/3">
                    <img
                        className="block aspect-29/37 bg-slate-700 mx-auto object-cover object-center"
                        src={`${ROOT_URL}/img/products/${selectedVariant?.images[0]}`}
                        alt={selectedVariant?.name}
                        crossOrigin="anonymous"
                        loading="lazy"
                    />
                </div>
                <VariantsPicker
                    productId={product._id}
                    variants={product.variants}
                    buttonText={'Bid Now'}
                    formSubmitHandler={formSubmitHandler}
                    currentBid={currentBid}
                    inAuction={true}
                    onVariantChange={(variant) => setSelectedVariant(variant)}
                />
                {error && <span className="alert-error">{error}</span>}
                {message && <span className="alert-success">{message}</span>}
            </div>
        </>
    )
}

export default AuctionForm
