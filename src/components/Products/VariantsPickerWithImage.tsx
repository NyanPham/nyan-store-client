import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useRef } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { ROOT_URL } from '../../config'
import Overlay from '../Overlay'
import VariantsPicker from './VariantsPicker'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { Variant } from '../../types'

type VariantsPickerWithImageProps = {
    selectedVariant: Variant
    id: string
    variants: Variant[]
    handleAddToCart?: any
    handleVariantChange?: any
    setOpenQuickView?: any
    buttonText?: string
    nameStyles?: string
    review?: any
    quantityControl?: boolean
    wishlist?: boolean
    isEditing?: boolean
    currentBid?: boolean
    currentQuantity?: number
}

export default function VariantsPickerWithImage(props : VariantsPickerWithImageProps) {
    const {
        selectedVariant,
        id,
        variants,
        handleAddToCart = () => {},
        handleVariantChange,
        setOpenQuickView,
        currentQuantity = 1,
        buttonText = 'Own Now',
        nameStyles = 'text-2xl',
        review = {},
        quantityControl = true,
        wishlist = false,
        isEditing = false,
        currentBid = false,
    } = props

    const popupRef = useRef<HTMLDivElement>(null)

    return (
        <Overlay closeModal={() => setOpenQuickView(false)} childRef={popupRef}>
            <div className="p-5 pb-7 w-30-rem bg-white flex gap-4" ref={popupRef}>
                <div className="w-1/3">
                    <LazyLoadImage
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
                    formSubmitHandler={handleAddToCart}
                    inAuction={false}
                    nameStyles={nameStyles}
                    review={review}
                    quantityControl={quantityControl}
                    wishlist={wishlist}
                    isEditing={isEditing}
                    onVariantChange={handleVariantChange}
                    currentQuantity={currentQuantity}
                    // currentBid={currentBid}
                />
                <button className="absolute right-4 top-3" type="button" onClick={() => setOpenQuickView(false)}>
                    <FontAwesomeIcon icon={faClose} />
                </button>
            </div>
        </Overlay>
    )
}
