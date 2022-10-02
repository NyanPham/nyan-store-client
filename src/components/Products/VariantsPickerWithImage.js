import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { ROOT_URL } from '../../config'
import VariantsPicker from './VariantsPicker'

export default function VariantsPickerWithImage(props) {
    const {
        selectedVariant,
        id,
        variants,
        handleAddToCart = () => {},
        handleVariantChange,
        setOpenQuickView,
        buttonText = 'Own Now',
        data = 'hello',
        nameStyles = 'text-2xl',
        review = {},
        quantityControl = true,
        wishlist = false,
        isEditing = false,
        currentBid = false,
    } = props

    return (
        <div className="z-20 bg-slate-700/90 fixed top-0 left-0 w-full h-full">
            <div className="p-3 w-30-rem bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4">
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
                    productId={id}
                    variants={variants}
                    currentVariantId={variants[0]?._id}
                    buttonText={buttonText}
                    data={data}
                    formSubmitHandler={handleAddToCart}
                    inAuction={false}
                    nameStyles={nameStyles}
                    review={review}
                    quantityControl={quantityControl}
                    wishlist={wishlist}
                    isEditing={isEditing}
                    onVariantChange={handleVariantChange}
                    currentBid={currentBid}
                />
                <button className="absolute right-4 top-3" type="button" onClick={() => setOpenQuickView(false)}>
                    <FontAwesomeIcon icon={faClose} />
                </button>
            </div>
        </div>
    )
}
