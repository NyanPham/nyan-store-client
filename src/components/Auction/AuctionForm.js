import React from 'react'
import VariantsPicker from '../Products/VariantsPicker'
import { useDispatch, useSelector } from 'react-redux'
import { auctionProduct } from '../../redux/actions/biddingActions'

function AuctionForm({ product, setOpenModal, currentBid }) {
    const { message, error } = useSelector((state) => state.biddingProducts)
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

    return (
        <>
            <span className="overlay" />
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-auto bg-white z-30 p-7">
                <button className="absolute top-2 right-2 text-xl text-gray-900" onClick={() => setOpenModal(false)}>
                    &times;
                </button>

                <VariantsPicker
                    variants={product.variants}
                    buttonText={'Bid Now'}
                    formSubmitHandler={formSubmitHandler}
                    currentBid={currentBid}
                />
                {error && <span className="alert-error">{error}</span>}
                {message && <span className="alert-success">{message}</span>}
            </div>
        </>
    )
}

export default AuctionForm
