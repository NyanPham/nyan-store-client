import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import ProductCardAction from './ProductCardAction'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, resetMessageError } from '../../redux/actions/cartActions'
import { useSideCartContext } from '../../context/sideCartContext'
import VariantsPicker from './VariantsPicker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { ROOT_URL } from '../../config'

function ProductHorizontalCard(props) {
    const { id, summary, name, slug, variants, createdAt, inAuction = false, currentBid = false } = props

    const isNew = new Date(Date.now() - new Date(createdAt)).getHours() < 24 * 1
    const firstVariant = variants[0]
    const { loading, error, message } = useSelector((state) => state.cart)
    const { setOpenSideCart } = useSideCartContext()
    const [openQuickView, setOpenQuickView] = useState(false)
    const dispatch = useDispatch()

    const handleAddToCart = (data) => {
        let dataToSubmit = {}

        if (data == null) {
            dataToSubmit = {
                variant: firstVariant._id,
                product: id,
                quantity: 1,
            }
        } else {
            dataToSubmit = {
                variant: data.variantId,
                product: id,
                quantity: data.quantity,
            }
        }

        dispatch(addToCart(dataToSubmit))
    }

    useEffect(() => {
        if (loading || error || message !== 'success') return
        if (!loading && message === 'success') {
            setOpenSideCart(true)
            dispatch(resetMessageError())
        }
    }, [loading, error, message, setOpenSideCart, dispatch])

    return (
        <div className="flex flex-row gap-3 items-center justify-start bg-white relative group p-2 md:p-4 lg:gap-12 border-t border-gray-300/50">
            <Link to={`/products/${slug}`} state={props} className="product-image w-36 h-max flex-shrink-0">
                <img
                    className="block aspect-29/37 bg-slate-700 mx-auto object-cover object-center"
                    src={`${ROOT_URL}/img/products/${firstVariant.images[0]}`}
                    alt={firstVariant.name}
                    crossOrigin="anonymous"
                    loading="lazy"
                />
                {/* <img className="" src={images[1]} alt={name} /> */}
            </Link>
            <div className="product-card-info mt-3 flex-grow-0">
                <h3 className="text-left text-lg truncate text-gray-900 font-semibold">{name}</h3>
                <h4 className="text-left text-gray-500 text-sm font-medium w-44 lg:w-96 block">
                    <p className="truncate">{summary}</p>
                </h4>
                {currentBid === false && (
                    <div className="flex justify-start items-center gap-2">
                        {firstVariant.comparePrice ? (
                            <>
                                <span className="product-card-compare-price text-left">
                                    ${firstVariant.comparePrice}
                                </span>
                                <span className="product-card-price text-left">${firstVariant.price}</span>
                            </>
                        ) : (
                            <span className="product-card-price text-left">${firstVariant.price}</span>
                        )}
                    </div>
                )}
            </div>
            <div className="absolute top-2 right-2 flex flex-col gap-3 overflow-hidden">
                <ProductCardAction
                    productId={id}
                    handleAddToCart={handleAddToCart}
                    setOpenQuickView={setOpenQuickView}
                />
            </div>
            {isNew && !inAuction && (
                <div className="absolute top-5 left-2 bg-yellow-400 py-0.5 px-2 text-xs text-white rounded-lg">New</div>
            )}
            {openQuickView &&
                ReactDOM.createPortal(
                    <div className="z-20 bg-slate-700/90 fixed top-0 left-0 w-full h-full">
                        <div className="p-3 w-96 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <VariantsPicker
                                productId={id}
                                variants={variants}
                                currentVariantId={firstVariant._id}
                                buttonText={'Own Now'}
                                formSubmitHandler={handleAddToCart}
                                currentBid={false}
                                nameStyles="text-2xl"
                                review={{
                                    show: false,
                                }}
                                quantityControl={true}
                                wishlist={false}
                                isEditing={false}
                            />
                            <button
                                className="absolute right-4 top-3"
                                type="button"
                                onClick={() => setOpenQuickView(false)}
                            >
                                <FontAwesomeIcon icon={faClose} />
                            </button>
                        </div>
                    </div>,
                    document.getElementById('modal-container')
                )}
        </div>
    )
}

export default ProductHorizontalCard
