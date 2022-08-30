import React, { useRef } from 'react'
import VariantsPicker from '../Products/VariantsPicker'
import { useDispatch, useSelector } from 'react-redux'
import { auctionProduct } from '../../redux/actions/biddingActions'

function AuctionForm({ product, setOpenModal }) {
    const { message, error } = useSelector((state) => state.biddingProducts)
    const dispatch = useDispatch()
    const auctionPriceRef = useRef()

    function formSubmitHandler(variantId) {
        dispatch(
            auctionProduct({
                variant: variantId,
                product: product._id,
                price: auctionPriceRef.current.value,
                duesIn: product.auctionExpiresIn,
            })
        )
    }

    return (
        <>
            <span className="overlay" />
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white z-30 p-7">
                <button className="absolute top-2 right-2 text-xl text-gray-900" onClick={() => setOpenModal(false)}>
                    &times;
                </button>
                <VariantsPicker
                    variants={product.variants}
                    buttonText={'Bid Now'}
                    formSubmitHandler={formSubmitHandler}
                />
                <div className="form-group">
                    <label htmlFor="aution-price" className="form-label">
                        Aution Price
                    </label>
                    <input
                        className="form-input "
                        id="auction-price"
                        type="number"
                        ref={auctionPriceRef}
                        min="0"
                        max="99999"
                        step="1"
                        defaultValue={0}
                    />
                </div>
                {error && <span>{error}</span>}
                {message && <span>{message}</span>}
            </div>
        </>
    )
}

export default AuctionForm
