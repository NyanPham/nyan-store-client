import React, { useRef, useState } from 'react'
import VariantOptions from './VariantOptions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons'
import useWishlist from '../../hooks/useWishlist'
import { useAuthContext } from '../../context/authContext'
import { Link } from 'react-router-dom'
import QuantityController from './QuantityController'
import { useSelector } from 'react-redux'
import useAddedToCart from '../../hooks/useAddedToCart'
import useDeepCompareEffect from '../../hooks/useDeepCompareEffect'
import { useEffect } from 'react'

const getTargetVariantFromProduct = (currentVariantId, variants) => {
    return currentVariantId != null
        ? variants.find((variant) => variant._id.toString() === currentVariantId)
        : variants[0]
}

function VariantsPicker(props) {
    const {
        productId,
        variants,
        currentVariantId,
        buttonText,
        formSubmitHandler,
        currentBid,
        nameStyles = 'text-xl',
        priceStyles = '',
        review = {},
        quantityControl = false,
        wishlist = false,
        isEditing = false,
        onVariantChange = () => {},
    } = props

    const [selectedVariant, setSelectedVariant] = useState(getTargetVariantFromProduct(currentVariantId, variants))
    const [desiredVariant, setDesiredVariant] = useState(getTargetVariantFromProduct(currentVariantId, variants))

    const [isUnavailable, setIsUnavailable] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [isSoldOut, setIsSoldOut] = useState(variants[0].inventory === 0)
    const { alreadyAdded, handleWishlistClick } = useWishlist(productId)
    const { isLoggedIn } = useAuthContext()
    const { loading, cart } = useSelector((state) => state.cart)
    const addedToCart = useAddedToCart(cart, productId)

    const priceRef = useRef()

    const firstOptions = filterDuplicateOption(variants, 'option1')
    const secondOptions = filterDuplicateOption(variants, 'option2')
    const thirdOptions = filterDuplicateOption(variants, 'option3')

    function handleOptionChange(data) {
        const newDesiredVariant = { ...desiredVariant, [data.orderNum]: data.option }

        setDesiredVariant(newDesiredVariant)

        const availableVariant = variants.find(
            (variant) =>
                compareStringValue(variant.option1, newDesiredVariant.option1) &&
                compareStringValue(variant.option2, newDesiredVariant.option2) &&
                compareStringValue(variant.option3, newDesiredVariant.option3)
        )

        if (!availableVariant) {
            setIsUnavailable(true)
        } else {
            setIsUnavailable(false)
            setSelectedVariant(availableVariant)
            setIsSoldOut(availableVariant.inventory === 0)
        }
    }

    let actionButtonText = buttonText
    if (addedToCart) actionButtonText = 'Added To Cart'
    if (isEditing) actionButtonText = 'Edit now'
    if (isUnavailable) actionButtonText = 'Unavailable'
    if (isSoldOut) actionButtonText = 'Soldout'
    if (loading) actionButtonText = 'Loading...'
    if (isEditing && currentVariantId === selectedVariant._id.toString()) actionButtonText = 'Updated'

    function handleSubmit(e) {
        e.preventDefault()
        const dataToSubmit = { variantId: selectedVariant._id }
        if (currentBid !== false) dataToSubmit['bidPrice'] = priceRef.current.value
        if (quantityControl) dataToSubmit['quantity'] = quantity

        formSubmitHandler(dataToSubmit)
    }

    useDeepCompareEffect(() => {
        if (typeof onVariantChange !== 'function') return

        onVariantChange(selectedVariant)
    }, [selectedVariant])

    useEffect(() => {
        console.log('changing')
        setSelectedVariant(getTargetVariantFromProduct(currentVariantId, variants))
        setDesiredVariant(getTargetVariantFromProduct(currentVariantId, variants))
    }, [variants, currentVariantId])

    return (
        <div className="">
            <h3 className={`text-slate-700 font-semibold capitalize ${nameStyles}`}>{selectedVariant.name}</h3>
            <div className={`flex gap-2 justify-start items-center mt-2 ${priceStyles}`}>
                {selectedVariant.comparePrice && (
                    <span className="product-card-compare-price text-base">${selectedVariant.comparePrice}</span>
                )}
                <span className="product-card-price text-2xl">${selectedVariant.price}</span>
            </div>
            {review?.show && (
                <div className="mt-2 lg:mt-4 w-full flex flex-col justify-between xl:flex-row">
                    <div>
                        {review.ratingsAverage &&
                            [1, 2, 3, 4, 5].map((value, index) => (
                                <FontAwesomeIcon
                                    className={`${
                                        value <= Math.floor(review.ratingsAverage) ? 'text-yellow-400' : 'text-gray-400'
                                    }`}
                                    icon={faStar}
                                    key={`star_${index}`}
                                />
                            ))}
                    </div>
                    <div className="flex justify-start items-center gap-2 xl:justify-center">
                        <button className="text-cyan-500 font-semibold transition duration-200 hover:text-cyan-300">
                            {review.ratingsQuantity > 0 ? `Read ${review.ratingsQuantity} reviews` : 'No reviews yet'}
                        </button>
                        <span className="text-cyan-500 font-semibold">|</span>
                        <button className="text-cyan-500 font-semibold transition duration-200 hover:text-cyan-300">
                            Write your review
                        </button>
                    </div>
                </div>
            )}
            <form className="form mt-1 w-full" onSubmit={handleSubmit}>
                {secondOptions && (
                    <VariantOptions
                        options={secondOptions}
                        currentOption={desiredVariant.option2}
                        styles={
                            'w-7 h-7 rounded-full flex items-center justify-center gap-3 text-slate-700 text-sm font-bold  border border-slate-300'
                        }
                        textHidden={true}
                        handleOptionChange={handleOptionChange}
                        optionOrderNum={'option2'}
                        optionType="Color"
                    />
                )}
                {firstOptions && (
                    <VariantOptions
                        options={firstOptions}
                        currentOption={desiredVariant.option1}
                        styles={
                            'w-8 h-8 flex items-center justify-center gap-3 text-slate-700 text-sm font-medium bg-slate-100 rounded-sm'
                        }
                        textHidden={false}
                        handleOptionChange={handleOptionChange}
                        optionOrderNum={'option1'}
                        optionType="Size"
                    />
                )}
                {thirdOptions && (
                    <VariantOptions
                        options={thirdOptions}
                        currentOption={desiredVariant.option3}
                        styles={
                            'h-7 w-fit px-3 flex items-center justify-center gap-3 text-slate-700 text-sm font-medium bg-slate-100 rounded-sm'
                        }
                        textHidden={false}
                        handleOptionChange={handleOptionChange}
                        optionOrderNum={'option3'}
                        optionType="Material"
                    />
                )}
                {currentBid != null && currentBid !== false && (
                    <div className="form-group">
                        <label htmlFor="auction-price" className="form-label">
                            Your Bid
                        </label>
                        <input
                            className="form-input"
                            type="number"
                            name="auction-price"
                            id="auction-price"
                            min={currentBid + 1}
                            step={1}
                            defaultValue={currentBid + 1}
                            ref={priceRef}
                        />
                    </div>
                )}
                {quantityControl && (
                    <QuantityController
                        inventory={selectedVariant.inventory}
                        isSoldOut={isSoldOut}
                        isUnavailable={isUnavailable}
                        onQuantityChange={setQuantity}
                        spacing="mt-7"
                        productId={productId}
                    />
                )}
                <div className="w-full flex items-center mt-5 gap-2">
                    <button
                        className="w-full py-1 text-lg font-semibold text-white bg-cyan-400 rounded-lg disabled:pointer-events-none disabled:bg-slate-300 disabled:text-slate-500"
                        disabled={
                            isUnavailable ||
                            isSoldOut ||
                            loading ||
                            (addedToCart && !isEditing) ||
                            currentVariantId === selectedVariant._id
                        }
                        type="submit"
                    >
                        {actionButtonText}
                    </button>
                    {wishlist && (
                        <>
                            {isLoggedIn ? (
                                <button type="button" className="" onClick={handleWishlistClick}>
                                    <FontAwesomeIcon
                                        className={`transition transform duration-200 text-4xl ${
                                            alreadyAdded ? 'text-red-500' : 'text-gray-300'
                                        }`}
                                        icon={faHeart}
                                    />
                                </button>
                            ) : (
                                <Link to="/login" className="">
                                    <FontAwesomeIcon className="text-4xl text-gray-300" icon={faHeart} />
                                </Link>
                            )}
                        </>
                    )}
                </div>
            </form>
        </div>
    )
}

function filterDuplicateOption(variants, optionPosition) {
    return variants.reduce((options, variant) => {
        if (options.includes(variant[optionPosition])) return options
        return [...options, variant[optionPosition]]
    }, [])
}

export function compareStringValue(value1, value2) {
    return value1?.toString().toLowerCase() === value2?.toString().toLowerCase()
}

export default VariantsPicker
