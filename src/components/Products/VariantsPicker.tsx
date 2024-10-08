import { useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import VariantOptions, { OptionChangeData } from './VariantOptions'
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
import Reviews from '../Review/Reviews'
import AddReviewButton from '../Review/AddReviewButton'
import { Variant, VariantDataToSubmit, VariantWithOrderNum } from '../../types'
import { CartState } from '../../redux/reducers/cartReducer'
import { BiddingState } from '../../redux/reducers/biddingReducer'

const getTargetVariantFromProduct = (currentVariantId : string, variants: Variant[]) : Variant | undefined => {
    return currentVariantId != null
        ? variants.find((variant) => variant?._id.toString() === currentVariantId)
        : variants[0]
}

type getButtonTextProps = {
    buttonText: string
    addedToCart: boolean
    isEditing: boolean
    isUnavailable: boolean
    isSoldOut: boolean
    loading: boolean
    inAuction: boolean
    currentVariantId: string
    selectedVariantId?: string
}

const getButtonText = ({
    buttonText,
    addedToCart,
    isEditing,
    isUnavailable,
    isSoldOut,
    loading,
    inAuction,
    currentVariantId,
    selectedVariantId,
}: getButtonTextProps) => {
    let actionButtonText = buttonText
    if (addedToCart) actionButtonText = 'Added To Cart'
    if (isEditing) actionButtonText = 'Edit now'
    if (isUnavailable) actionButtonText = 'Unavailable'
    if (isSoldOut) actionButtonText = 'Soldout'
    if (isEditing && currentVariantId === selectedVariantId) actionButtonText = 'Update now'
    if (inAuction) actionButtonText = 'Bid Now'
    if (loading) actionButtonText = 'Loading...'
    
    return actionButtonText
}

type VariantsPickerProps = {
    productId: string
    productName?: string
    variants: Variant[]
    currentVariantId: string
    buttonText: string
    formSubmitHandler: (data: VariantDataToSubmit) => void
    currentBidData?: any
    inAuction?: boolean
    nameStyles?: string
    priceStyles?: string
    review?: any
    quantityControl?: boolean
    wishlist?: boolean
    isEditing?: boolean
    onVariantChange?: (variant: Variant) => void
    currentQuantity?: number
}

function VariantsPicker(props : VariantsPickerProps) {
    const {
        productId,
        productName = '',
        variants,
        currentVariantId,
        buttonText,
        formSubmitHandler,
        currentBidData = {},
        inAuction = false,
        nameStyles = 'text-xl',
        priceStyles = '',
        review = {},
        quantityControl = false,
        wishlist = false,
        isEditing = false,
        onVariantChange = () => {},
        currentQuantity = 1,
    } = props

    const [selectedVariant, setSelectedVariant] = useState(getTargetVariantFromProduct(currentVariantId, variants))
    const [desiredVariant, setDesiredVariant] = useState(getTargetVariantFromProduct(currentVariantId, variants))

    const [isUnavailable, setIsUnavailable] = useState(false)
    const [quantity, setQuantity] = useState(currentQuantity)
    const [isSoldOut, setIsSoldOut] = useState<boolean>(variants[0].inventory === 0)
    const { alreadyAdded, handleWishlistClick } = useWishlist(productId)
    const { isLoggedIn } = useAuthContext()
    const { loading, cart } = useSelector((state: { cart: CartState }) => state.cart)
    const addedToCart = useAddedToCart(cart, productId)
    const { loading: biddingLoading } = useSelector((state: { biddingProducts: BiddingState }) => state.biddingProducts)
    const [showReviews, setShowReviews] = useState(false)

    const priceRef = useRef<HTMLInputElement>(null)

    const firstOptions = filterDuplicateOption(variants, 'option1')
    const secondOptions = filterDuplicateOption(variants, 'option2')
    const thirdOptions = filterDuplicateOption(variants, 'option3')

    function handleOptionChange(data: OptionChangeData) {
        const newDesiredVariant = { ...desiredVariant, [data.orderNum]: data.option } as VariantWithOrderNum

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


    function handleSubmit(e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (selectedVariant == null) return;

        const dataToSubmit: VariantDataToSubmit = {
            variantId: selectedVariant._id,
        }

        if (inAuction) dataToSubmit['bidPrice'] = priceRef.current?.value
        if (quantityControl) dataToSubmit['quantity'] = quantity

        formSubmitHandler(dataToSubmit)
    }

    useDeepCompareEffect(() => {
        if (typeof onVariantChange !== 'function' || selectedVariant == null) return

        onVariantChange(selectedVariant)
    }, [selectedVariant])

    useEffect(() => {
        setSelectedVariant(getTargetVariantFromProduct(currentVariantId, variants))
        setDesiredVariant(getTargetVariantFromProduct(currentVariantId, variants))
    }, [variants, currentVariantId])

    const actionButtonText = getButtonText({
        buttonText,
        addedToCart,
        isEditing,
        isUnavailable,
        isSoldOut,
        loading,
        inAuction,
        currentVariantId,
        selectedVariantId: selectedVariant?._id.toString(),
    })
        
    useDeepCompareEffect(() => {
        if (currentVariantId == null || variants.length === 0) return

        setSelectedVariant(getTargetVariantFromProduct(currentVariantId, variants))
        setDesiredVariant(getTargetVariantFromProduct(currentVariantId, variants))
    }, [currentVariantId, variants])

    return (
        <div className="">
            <h3 className={`text-slate-700 font-semibold capitalize ${nameStyles}`}>{selectedVariant?.name}</h3>
            <div className={`flex gap-2 justify-start items-center mt-2 ${priceStyles}`}>
                {selectedVariant?.comparePrice && (
                    <span className="product-card-compare-price text-base">${selectedVariant?.comparePrice}</span>
                )}
                <span className="product-card-price text-2xl">${selectedVariant?.price}</span>
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
                        <button
                            className="text-cyan-500 font-semibold transition duration-200 hover:text-cyan-300"
                            onClick={() => (review.reviews.length > 0 ? setShowReviews(true) : setShowReviews(false))}
                        >
                            {review.ratingsQuantity > 0 ? `Read ${review.ratingsQuantity} reviews` : 'No reviews yet'}
                        </button>
                        <span className="text-cyan-500 font-semibold">|</span>
                        <AddReviewButton productName={productName} productId={productId} />
                    </div>
                </div>
            )}
            <form className="form mt-1 w-full" onSubmit={handleSubmit}>
                {secondOptions && desiredVariant?.option2 && (
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
                {firstOptions && desiredVariant?.option1 && (
                    <VariantOptions
                        options={firstOptions}
                        currentOption={desiredVariant.option1}
                        styles={
                            'w-8 h-8 flex items-center justify-center gap-3 text-slate-700 text-sm font-medium bg-slate-100 rounded-sm uppercase'
                        }
                        textHidden={false}
                        handleOptionChange={handleOptionChange}
                        optionOrderNum={'option1'}
                        optionType="Size"
                    />
                )}
                {thirdOptions && desiredVariant?.option3 && (
                    <VariantOptions
                        options={thirdOptions}
                        currentOption={desiredVariant.option3}
                        styles={
                            'h-7 w-fit px-3 flex items-center justify-center gap-3 text-slate-700 text-sm font-medium bg-slate-100 rounded-sm capitalize'
                        }
                        textHidden={false}
                        handleOptionChange={handleOptionChange}
                        optionOrderNum={'option3'}
                        optionType="Material"
                    />
                )}
                {inAuction && currentBidData && (
                    <div className="form-group">
                        <label htmlFor="auction-price" className="form-label">
                            Your Bid
                        </label>
                        <input
                            className="form-input"
                            type="number"
                            name="auction-price"
                            id="auction-price"
                            min={currentBidData?.price + 1}
                            step={1}
                            defaultValue={currentBidData?.price + 1}
                            ref={priceRef}
                        />
                    </div>
                )}
                {quantityControl && selectedVariant?.inventory && (
                    <QuantityController
                        inventory={selectedVariant.inventory}
                        isSoldOut={isSoldOut}
                        isUnavailable={isUnavailable}
                        onQuantityChange={setQuantity}
                        spacing="mt-7"
                        productId={productId}
                        currentQuantity={currentQuantity} // Add this prop
                    />
                )}
                <div className="w-full flex items-center mt-5 gap-2">
                    <button
                        className="w-full py-1 text-lg font-semibold text-white bg-cyan-400 rounded-lg disabled:pointer-events-none disabled:bg-slate-300 disabled:text-slate-500"
                        disabled={
                            isUnavailable ||
                            isSoldOut ||
                            loading ||
                            (biddingLoading && inAuction) ||
                            (addedToCart && !isEditing && !inAuction)
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
            {showReviews &&
                ReactDOM.createPortal(
                    <div className="fixed top-0 left-0 w-full h-full z-30 flex justify-center items-center">
                        <Reviews reviews={review?.reviews} closeReviews={() => setShowReviews(false)} />
                    </div>,
                    document.getElementById('modal-container')!
                )}
        </div>
    )
}
    
function filterDuplicateOption(variants : Variant[], optionPosition: string) {
    return variants.reduce((options: string[], variant: Variant) => {
        if (options.includes((variant as any)[optionPosition])) return options
        return [...options, (variant as any)[optionPosition]]
    }, [])
}

export function compareStringValue(value1: string, value2: string) {
    return value1.toLowerCase() === value2.toLowerCase()
}

export default VariantsPicker